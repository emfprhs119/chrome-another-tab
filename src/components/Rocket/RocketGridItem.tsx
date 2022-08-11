/**
 * A single bookmark item of the bookmark grid.
 * Wrapped in SortableElement from react-sortable-hoc to make it sortable (in
 * the grid).
 * Since SortableElement doesn't work well with some CSS properties,
 * (specifically, hover and transition), we toggle them if the user is dragging
 * an item across the grid.
 */
import React, { EventHandler } from 'react';
import styled from 'styled-components/macro';
import { SortableElement } from 'react-sortable-hoc';
import { getFaviconUrl } from '../../utils/getFaviconUrl';
import { Theme } from '../../types/Theme';

interface Props {
  id: string;
  title: string;
  url?: string;
  isHidden: boolean;
  isHoverDisabled?: boolean;
  isTransitionDisabled?: boolean;
}

export const RocketGridItem = SortableElement<Props>(
  ({ title, url, isHidden, isHoverDisabled, isTransitionDisabled }) => {
    const faviconSrc = url && getFaviconUrl(url);

    return (
      <Root
        draggable={false} // Disables the browser built-in drag handler
        href={url}
        rel='noopener noreferrer'
        isHoverDisabled={isHoverDisabled}
        isTransitionDisabled={isTransitionDisabled}>
        <Content isHidden={isHidden} draggable={false}>
          {url && <Favicon src={faviconSrc} draggable={false} />}
          {/* <Title>{title}</Title> */}
        </Content>
      </Root>
    );
  }
);

interface RootProps {
  theme: Theme;
  isHoverDisabled?: boolean;
  isTransitionDisabled?: boolean;
}
const Root = styled.a`
  display: flex;
  touch-action: none;
  // flex-direction: row;
  flex-direction: column;

  margin: 8px;
  text-align: left;
  background: ${(props: RootProps) => props.theme.itemBackground};
  border: ${(props: RootProps) => props.theme.itemBorder};
  box-shadow: ${(props: RootProps) => props.theme.itemShadow};
  border-radius: 20px;
  cursor: ${(props: RootProps) => (props.isHoverDisabled ? 'initial' : 'pointer')};
  text-decoration: none;
  box-sizing: border-box;
  /* 
  We need to set transition to "initial" here while dragging elements, otherwise
  the built-in react-sortable-hoc transition won't work: 
  See: https://github.com/clauderic/react-sortable-hoc/issues/334 
  */
  transition: ${(props: RootProps) =>
    props.isTransitionDisabled ? 'initial' : 'background 0.2s ease-out, box-shadow 0.2s ease-out'};

  &:hover,
  &:focus {
    background: ${(props: RootProps) =>
      props.isHoverDisabled ? props.theme.itemBackground : props.theme.itemHoverBackground};
    box-shadow: ${(props: RootProps) => (props.isHoverDisabled ? props.theme.itemShadow : props.theme.itemHoverShadow)};
    outline: none;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  opacity: ${(props: { isHidden: boolean }) => (props.isHidden ? '0.4' : '1')};
`;

const Favicon = styled.img`
  height: 112px;
  width: 112px;
  min-width: 112px;
  padding: 8px;
`;

// const Title = styled.span`
//   user-select: none;
//   letter-spacing: 0px;
//   font-weight: 500;
//   color: ${(props: { theme: Theme }) => props.theme.itemTextColor};
//   overflow: hidden;
//   text-overflow: ellipsis;
//   word-break: break-word;
//   display: -webkit-box;
//   -webkit-box-orient: vertical;
//   -webkit-line-clamp: 2;

//   ${Root}:hover & {
//     color: ${(props: { theme: Theme }) => props.theme.itemHoverTextColor};
//   }

//   ${Root}:focus & {
//     color: ${(props: { theme: Theme }) => props.theme.itemHoverTextColor};
//   }
// `;
