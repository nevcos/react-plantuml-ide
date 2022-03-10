import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CodeEditor } from "@nevcos/react-plantuml-ide-editor/src/ui/CodeEditor";
import { DiagramCode } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramCode";
import { DiagramsList } from "@nevcos/react-plantuml-ide-list/src/ui/DiagramsList";
import { DiagramId } from "@nevcos/react-plantuml-ide-shared/src/diagram/DiagramId";
import PlantUmlPreview from "@nevcos/react-plantuml-ide-preview/src/ui/PlantUmlPreview";
import { Spinner } from "./Spinner";
import { useStore } from "../store/zustand/store";
import * as storeActions from "../store/zustand/storeActions";
import * as storeSelectors from "../store/domain/diagramStoreState/diagramStoreStateSelectors";

const AppGridDiv = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: fit-content(80%);
  grid-gap: 10px;
  grid-template-areas:
    "sidebar content"
    "sidebar preview";
`;

const SideBarDiv = styled.div`
  grid-area: sidebar;
  overflow: auto;

  background-color: #eee;
`;

const ContentDiv = styled.div`
  grid-area: content;
  overflow: auto;

  background-color: white;
`;

const PreviewDiv = styled.div`
  grid-area: preview;
  overflow: auto;

  background-color: white;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

export function App() {
  const dispatch = useDispatch();

  const isLoading = useStore(storeSelectors.isLoading);
  const diagrams = useStore(storeSelectors.getDiagrams);
  const selectedDiagram = useStore(storeSelectors.getSelectedDiagram);

  useEffect(() => {
    storeActions.fetchDiagrams();
  }, []);

  const onSelectDiagram = useCallback((id: DiagramId) => storeActions.selectDiagram(id), []);
  const onCreateDiagram = useCallback(() => storeActions.createNewDiagram(), []);
  const onDeleteDiagram = useCallback((id: DiagramId) => storeActions.deleteDiagram(id), []);
  const onCodeChange = useCallback((code: DiagramCode) => storeActions.updateSelectedDiagramCode(code), []);

  return (
    <AppGridDiv>
      <SideBarDiv>
        {isLoading ? (
          <Spinner />
        ) : (
          <DiagramsList
            selectedId={selectedDiagram?.id}
            diagrams={diagrams}
            onSelectDiagram={onSelectDiagram}
            onCreateDiagram={onCreateDiagram}
            onDeleteDiagram={onDeleteDiagram}
          />
        )}
      </SideBarDiv>
      <ContentDiv>
        <CodeEditor key={selectedDiagram?.id} code={selectedDiagram?.code} onChange={onCodeChange} />
      </ContentDiv>
      <PreviewDiv>
        <PlantUmlPreview key={selectedDiagram?.id} code={selectedDiagram?.code} />
      </PreviewDiv>
    </AppGridDiv>
  );
}
