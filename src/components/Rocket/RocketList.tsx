/**
 * The list of bookmark folders. Handle the interactions between the folder
 * show/hide option and Redux.
 */
import React, { FC, memo, useState } from 'react';
import styled from 'styled-components/macro';
import { Folder } from '../../types/Folder';
import { actions } from '../../actions';
import { useMappedActions } from '../../hooks/useMappedActions';
import { RocketGrid } from './RocketGrid';
import { useMappedState } from 'redux-react-hook';
import { ReduxState } from '../../types/ReduxState';

interface Props {
  folder: Folder;
}

const mapState = (state: ReduxState) => ({
  isSwapTopDown: state.session.isSwapTopDown,
});

export const RocketList: FC<Props> = memo(({ folder }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { isSwapTopDown } = useMappedState(mapState);
  const { moveBookmark } = useMappedActions(actions);
  const handleStartDragging = () => {
    setIsDragging(true);
  };
  const handleStopDragging = (
    folder: Folder,
    params: {
      oldIndex: number;
      newIndex: number;
    }
  ) => {
    const bookmark = folder.bookmarks[params.oldIndex];
    moveBookmark(bookmark, params.oldIndex, params.newIndex);
    setIsDragging(false);
  };
  return (
    <Root style={{ top: isSwapTopDown ? '0' : '70vh' }}>
      <FolderItem key={folder.id}>
        {/* <FolderHeader title={folder.title} isHidden={folder.isHidden} onOptionClick={handleOptionClick} /> */}
        <RocketGrid
          folder={folder}
          isFolderHidden={folder.isHidden}
          isDragging={isDragging}
          axis='xy'
          distance={8}
          updateBeforeSortStart={handleStartDragging}
          onSortEnd={(params) => handleStopDragging(folder, params)}
        />
      </FolderItem>
    </Root>
  );
});

const Root = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
`;

const FolderItem = styled.li`
  list-style: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
`;
