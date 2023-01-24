import { size } from "@/styles/variables";
import styled, { css } from "styled-components";

interface IRow {
   alignX?: string;
   alignY?: string;
   direction?: string;
}

export const Row = styled.section<IRow>`
  display: flex;
  flex-direction: ${props => props.direction ?? "row"};
  justify-content: ${props => props.alignX ?? "flex-start"};
  align-items: ${props => props.alignY ?? "flex-start"};
`;

interface ICol {
   size: number;
   sizeSm?: number;
   sizeMd?: number;
   sizeLg?: number;
   paddingTop?: number;
}

export const Col = styled.div<ICol>`
  width: ${props => 100 * props.size / 12}%;
   padding-top: ${props => props.paddingTop ?? 0}px;

  ${props => props.sizeSm && css<ICol>`
     @media ${size.small} {
        width: ${props => 100 * (props.sizeSm ?? props.size) / 12}%;
     }
  `}

  ${props => props.sizeMd && css<ICol>`
     @media ${size.medium} {
        width: ${props => 100 * (props.sizeMd ?? props.size) / 12}%;
     }
  `}

  ${props => props.sizeLg && css<ICol>`
     @media ${size.large} {
        width: ${props => 100 * (props.sizeLg ?? props.size) / 12}%;
     }
  `}
`;
