/**
 * App entry point
 */
import React, { FC } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components/macro';
import { isEmpty } from 'lodash';
import { FolderList } from './FolderList';
import { useOnMount } from '../hooks/useOnMount';
import { actions } from '../actions';
import { Header } from './Header';
import { ReduxState } from '../types/ReduxState';
import { useMappedState } from 'redux-react-hook';
import { useMappedActions } from '../hooks/useMappedActions';
import { getBookmarkTree } from '../selectors/getBookmarkTree';
import { NoResult } from './NoResult';
import { Theme } from '../types/Theme';
import { getCurrentTheme } from '../selectors/getCurrentTheme';
import { RocketList } from './Rocket/RocketList';

const mapState = (state: ReduxState) => ({
  bookmarkTree: getBookmarkTree(state),
  areBookmarksReady: state.session.areBookmarksReady,
  currentTheme: getCurrentTheme(state),
  isSwapTopDown: state.session.isSwapTopDown,
});

export const App: FC = () => {
  const { areBookmarksReady, bookmarkTree, currentTheme, isSwapTopDown } = useMappedState(mapState);
  const { retrieveBookmarks, rehydrate } = useMappedActions(actions);

  const isBookmarkTreeEmpty = isEmpty(bookmarkTree);
  const isHasSubBookmark = bookmarkTree.length > 1;

  useOnMount(() => {
    rehydrate();
    retrieveBookmarks();
  });

  if (!areBookmarksReady) {
    return null;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <Root>
        <Header />
        {!isSwapTopDown && <RocketList folder={bookmarkTree[0]} />}
        {!isBookmarkTreeEmpty && (
          <Main>
            <div>{isHasSubBookmark && <FolderList bookmarkTree={bookmarkTree.slice(1)} />}</div>
          </Main>
        )}
        {isSwapTopDown && <RocketList folder={bookmarkTree[0]} />}
        {isBookmarkTreeEmpty && <NoResult />}
      </Root>
    </ThemeProvider>
  );
};

const fadeIn = keyframes`
  from { opacity: 0;}
  to { opacity: 1; }
`;

const Root = styled.div`
  animation: ${fadeIn} 0.1s ease-in-out both;
  text-align: center;
  transition: all 0.6s ease-out;
  width: 100%;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    will-change: transform;
    z-index: -1;
    background: ${(props: { theme: Theme }) => props.theme.appBackground};
  }
`;

const Main = styled.main`
  animation: ${fadeIn} 0.2s ease-in-out both;
  animation-delay: 0.1s;
  display: flex;
  top: 3vh;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
