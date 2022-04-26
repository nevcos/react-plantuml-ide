import { useCallback, useState } from "react";
import styled from "styled-components/macro";

import { CodeEditor } from "../codeEditor/CodeEditor";
import { useZoomable } from "./useZoomable";
import { useDraggable } from "./useDraggable";
import { Toolbar } from "../toolbar/Toolbar";
import { Preview } from "../preview/Preview";

const Styled_Container = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Styled_EditorContainer = styled.section`
  width: 100%;
  height: 100%;
  position: relative;

  > .editor {
    z-index: 2;
    transition: opacity 200ms;

    &:not(.--active) {
      pointer-events: none;
      opacity: 0.5;
    }
  }
`;

const Styled_PreviewContainer = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;

  z-index: 1;
  cursor: move;
  transition: opacity 200ms;

  &:not(.--active) {
    pointer-events: none;
    opacity: 0.6;
  }
`;

const Styled_MouseCapture = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  // border-left: 3px solid var(--color-gray-lightest);

  z-index: 3;
  cursor: move;

  &:not(.--active) {
    pointer-events: none;
  }
`;

const Styled_PreviewContent = styled.div`
  position: absolute;
  right: 0;
  width: 60%;
  height: 100%;
  padding: var(--padd);
`;

export function ContentMixedPreview(): JSX.Element {
  const [isPreviewActive, setPreviewActive] = useState(false);

  const { isDragging, initDraggable } = useDraggable();
  const { initZoomable } = useZoomable();

  const previewContainerRef = useCallback((node) => {
    node && initDraggable(node);
    node && initZoomable(node);
  }, []);

  const onCaptureMouseOver = useCallback(() => setPreviewActive(true), []);
  const onCaptureMouseOut = useCallback(() => setPreviewActive(false), []);

  const editorActiveClass = isPreviewActive || isDragging ? "" : "--active";
  const previewActiveClass = isPreviewActive || isDragging ? "--active" : "";

  return (
    <Styled_Container>
      <Styled_EditorContainer>
        <CodeEditor className={"editor " + editorActiveClass} />
        <Toolbar />
      </Styled_EditorContainer>
      <Styled_PreviewContainer ref={previewContainerRef} className={previewActiveClass} onMouseOut={onCaptureMouseOut}>
        <Styled_PreviewContent>
          <Preview />
        </Styled_PreviewContent>
      </Styled_PreviewContainer>
      <Styled_MouseCapture className={editorActiveClass} onMouseOver={onCaptureMouseOver} aria-hidden="true" />
    </Styled_Container>
  );
}
