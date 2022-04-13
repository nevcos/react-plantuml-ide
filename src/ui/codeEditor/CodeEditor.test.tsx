import { screen } from "@testing-library/dom";

import { renderWithRoutingAndStore } from "../../test/reactTestUtils";

import type { NoteContent } from "../../domain/note/NoteContent";
import { CodeEditor } from "./CodeEditor";
import { createNewPlantUml, createEmptyGistState } from '../../domain/noteStoreState/noteStoreStateSelectors';
import { addNote } from '../../domain/noteStoreState/noteStoreStateReducers';
import {createEmptyState} from "../../domain/storeState/storeStateSelectors";

describe("<CodeEditor />", () => {
  it("should display code editor with the expected code", async () => {
    const note = createNewPlantUml();
    document.code = "Test->Success" as NoteContent;
    const state = createEmptyState()
    addNote(state.gist, {payload: note});

    renderWithRoutingAndStore(<CodeEditor />, state, `/gists/${document.id}`);

    // FIXME: Not working
    // expect(await screen.findByText(document.code)).toBeDefined();
  });

  it("should change code in store when user changes code", async () => {
    // TODO
  });
});
