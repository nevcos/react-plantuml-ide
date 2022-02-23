import styled from "styled-components";
import {DiagramId} from "../types";
import {Diagram} from "../model/Diagram";

const ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OptionLi = styled.li`
  display: flex;

  &.--selected {
    background-color: white;
  }

  &:hover {
    background-color: lightgray;
  }
`;

const OptionButton = styled.button`
  border: none;
  padding: 10px;
  width: 100%;
  background-color: transparent;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const NewButton = styled(OptionButton)`
  background-color: lightskyblue;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  border-color: transparent;
  background-color: transparent;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover {
    background-color: rosybrown;
  }
`;

interface DiagramListProps {
  selectedId: DiagramId | null;
  diagrams: Diagram[];
  onSelectedId?: (id: DiagramId) => void;
  onCreateDiagram?: () => void;
  onDeleteDiagram?: (id: DiagramId) => void;
  onRenameDiagram?: (id: DiagramId) => void;
}

export function DiagramsList({
  selectedId,
  diagrams,
  onSelectedId,
  onCreateDiagram,
  onDeleteDiagram,
  onRenameDiagram
}: DiagramListProps): JSX.Element {
  return (
    <ListUl>
      {[
        <OptionLi key="create">
          <NewButton onClick={onCreateDiagram}>+ Create new</NewButton>
        </OptionLi>,
        ...diagrams.map((diagram) => (
          <OptionLi
            key={diagram.id}
            className={diagram.id === selectedId ? "--selected" : ""}
          >
            <OptionButton
              onClick={() => onSelectedId?.(diagram.id)}
              onDoubleClick={() => onRenameDiagram?.(diagram.id)}
            >
              {diagram.name}
            </OptionButton>
            <DeleteButton onClick={() => onDeleteDiagram?.(diagram.id)}>
              X
            </DeleteButton>
          </OptionLi>
        ))
      ]}
    </ListUl>
  );
}
