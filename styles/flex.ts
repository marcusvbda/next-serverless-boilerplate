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
   gap?: string
}

export const Row = styled.section<IRow>`
   width: 100%;
   display: flex;
   flex-direction: ${props => props.direction ?? "row"};
   justify-content: ${props => props.alignX ?? "flex-start"};
   align-items: ${props => props.alignY ?? "flex-start"};
   flex-wrap: ${props => props.wrap ?? "wrap"};
   margin-left: ${props => props.marginX ? (props.marginX + 'px') : '0'};
   margin-right: ${props => props.marginX ? (props.marginX + 'px') : '0px'};
   margin-top: ${props => props.marginY ?? 0}px;
   margin-bottom: ${props => props.marginY ?? 0}px;
   border-bottom: ${props => props.borderBottom ?? 'none'};
   padding: ${props => props.padding ?? '0px'};
   gap: ${props => props.gap ?? '0px'};
   transition: all 0.3s ease-in-out;
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
   padding-top: ${props => props.paddingTop ?? 0}px;
   padding-left : 10px;
   padding-right : 10px;
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
