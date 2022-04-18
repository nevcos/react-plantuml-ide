import { memo, MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Folder } from "../../domain/folder/Folder";
import { NoteName } from "../../domain/note/NoteName";
import { useGistSelector } from "../../hook/useGistSelector";
import { noteStoreActions, noteStoreSelectors } from "../../store/noteStore";
import { useNavigation } from "../shared/useNavigation";

import * as Styled from "./Sidebar.style";
import { SidebarNavItemLink } from "./SidebarNavItemLink";

type Props = {
  folder: Folder;
};

export const SidebarNavFolder = memo(function ({ folder }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const files = useGistSelector((state) => noteStoreSelectors.getNotesByFolder(state, folder.id));

  const onClickDeleteFolder = useCallback(
    (event: MouseEvent) => {
      const message = `Delete folder ${folder.name}? It will delete all files inside.`;
      const isConfirmationBypassed = event.ctrlKey && event.shiftKey;
      const isConfirmed = isConfirmationBypassed || window.confirm(message);
      if (isConfirmed) {
        dispatch(noteStoreActions.deleteFolder({ navigation, id: folder.id }));
      }
    },
    [folder]
  );

  const onClickCreateNote = useCallback(
    (event: MouseEvent) => {
      const filename = prompt("Please enter the filename, including extension.\nExample: README.md") as NoteName;
      if (filename) {
        dispatch(noteStoreActions.createNote({ navigation, filename, folderId: folder.id }));
      }
    },
    [folder]
  );

  // TODO: should we show empty folders?

  return files.length ? (
    <Styled.FolderLi key={folder.id}>
      <Styled.FolderTitle>
        <span className="icon fa-solid fa-folder" aria-hidden="true" />
        <span className="label">{folder.name}</span>
        <Styled.DefaultIconButton onClick={onClickCreateNote} title="Create Note" aria-label="Create Note">
          <span className="icon fa-solid fa-plus" aria-hidden="true" />
        </Styled.DefaultIconButton>
        <Styled.DeleteButton onClick={onClickDeleteFolder} title="Delete" aria-label="Delete">
          <span className="icon fa-solid fa-xmark" aria-hidden="true" />
        </Styled.DeleteButton>
      </Styled.FolderTitle>
      <Styled.ListUl className="notes-list">
        {files.map((note) => (
          <SidebarNavItemLink note={note} key={note.id} />
        ))}
      </Styled.ListUl>
    </Styled.FolderLi>
  ) : null;
});
