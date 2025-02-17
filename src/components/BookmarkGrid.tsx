/**
 * Grid of bookmarks (of a specific folder).
 * Wrapped in SortableContainer from react-sortable-hoc to allow the
 * re-ordering of its childrens.
 */
import React from 'react';
import styled from 'styled-components/macro';
import { SortableContainer } from 'react-sortable-hoc';
import { BookmarkGridItem } from './BookmarkGridItem';
import { Folder } from '../types/Folder';

interface Props {
  folder: Folder;
  isDragging: boolean;
  isFolderHidden: boolean;
}

export const BookmarkGrid = SortableContainer<Props>(({ folder, isDragging, isFolderHidden }) => {
  return (
    <Root>
      {folder.bookmarks.map((bookmark, index) => (
        <BookmarkGridItem
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
  display: grid;
  grid-template-columns: repeat(auto-fit, 280px);
  padding-left: 0;
`;
