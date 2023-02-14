import { size } from "@/styles/variables";
import styled, { css } from "styled-components";

interface IRow {
   alignX?: string;
   alignY?: string;
   direction?: string;
   marginX?: number;
   marginY?: number;
   borderBottom?: string;
   wrap?: string;
   padding?: string;
}

export const Row = styled.section<IRow>`
   width: 100%;
   display: flex;
   flex-direction: ${props => props.direction ?? "row"};
   justify-content: ${props => props.alignX ?? "flex-start"};
   align-items: ${props => props.alignY ?? "flex-start"};
   flex-wrap: ${props => props.wrap ?? "wrap"};
   margin-right: ${props => props.marginX ?? -10}px;
   margin-left: ${props => props.marginX ?? -10}px;
   margin-top: ${props => props.marginY ?? 0}px;
   margin-bottom: ${props => props.marginY ?? 0}px;
   border-bottom: ${props => props.borderBottom ?? 'none'};
   padding: ${props => props.padding ?? '0px'};

   @media ${size.small} {
      margin-right: 0px;
      margin-left: 0px;
   }
`;

interface ICol {
   size: number;
   sizeSm?: number;
   sizeMd?: number;
   sizeLg?: number;
   paddingTop?: number;
   direction?: string;
   paddingSm?: number;
   smOrder?: number;
}

export const Col = styled.div<ICol>`
   width: ${props => 100 * props.size / 12}%;
   padding: ${props => props.paddingTop ?? 0}px 10px;
   display: flex;
   flex-direction: ${props => props.direction ?? "column"};
   ${props => props.smOrder && css<ICol>`
         @media ${size.small} {
            order: ${props => props.smOrder};
         }
   `}
   ${props => props.sizeSm && css<ICol>`
         @media ${size.small} {
            padding: ${props => props.paddingSm ?? props.paddingSm ?? 0}px;
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
