import { size } from "@/styles/variables";
import styled, { css } from "styled-components";

interface RowInterface {
  alignX?: string;
  alignY?: string;
  direction?: string;
}

export const Row = styled.section<RowInterface>`
  display: flex;
  flex-direction: ${props => props.direction ?? "row"};
  justify-content: ${props => props.alignX ?? "flex-start"};
  align-items: ${props => props.alignY ?? "flex-start"};
`;

interface ColInterface {
  size: number;
  sizeSm?: number;
  sizeMd?: number;
  sizeLg?: number;
}

export const Col = styled.div<ColInterface>`
  width: ${props => 100 * props.size / 12}%;

  ${props => props.sizeSm && css<ColInterface>`
     @media ${size.small} {
        width: ${props => 100 * (props.sizeSm ?? props.size) / 12}%;
     }
  `}

  ${props => props.sizeMd && css<ColInterface>`
     @media ${size.medium} {
        width: ${props => 100 * (props.sizeMd ?? props.size) / 12}%;
     }
  `}

  ${props => props.sizeLg && css<ColInterface>`
     @media ${size.large} {
        width: ${props => 100 * (props.sizeLg ?? props.size) / 12}%;
     }
  `}
`;
