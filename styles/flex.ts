import { size } from "@/styles/variables";
import styled, { css } from "styled-components";

interface IRow {
   alignX?: string;
   alignY?: string;
   direction?: string;
   marginX?: number;
   marginY?: number;
}

export const Row = styled.section<IRow>`
   display: flex;
   flex-direction: ${props => props.direction ?? "row"};
   justify-content: ${props => props.alignX ?? "flex-start"};
   align-items: ${props => props.alignY ?? "flex-start"};
   flex-wrap: wrap;
   margin-right: ${props => props.marginX ?? -10}px;
   margin-left: ${props => props.marginX ?? -10}px;
   margin-top: ${props => props.marginY ?? 0}px;
   margin-bottom: ${props => props.marginY ?? 0}px;
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
   padding: ${props => props.paddingTop ?? 0}px 10px;
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
