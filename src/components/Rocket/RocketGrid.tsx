/**
 * Grid of bookmarks (of a specific folder).
 * Wrapped in SortableContainer from react-sortable-hoc to allow the
 * re-ordering of its childrens.
 */
import React from 'react';
import styled from 'styled-components/macro';
import { SortableContainer } from 'react-sortable-hoc';
import { RocketGridItem } from './RocketGridItem';
import { Folder } from '../../types/Folder';

interface Props {
  folder: Folder;
  isDragging: boolean;
  isFolderHidden: boolean;
}

export const RocketGrid = SortableContainer<Props>(({ folder, isDragging, isFolderHidden }) => {
  return (
    <Root>
      {folder.bookmarks.map((bookmark, index) => (
        <RocketGridItem
          key={bookmark.id}
          id={bookmark.id}
          index={index}
          title={bookmark.title}
          url={bookmark.url}
          isHoverDisabled={isDragging}
          isTransitionDisabled={isDragging}
          isHidden={isFolderHidden}
        />
      ))}
    </Root>
  );
});

const Root = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`;
