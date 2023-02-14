import { size, color } from "@/styles/variables";
import { createGlobalStyle, css } from "styled-components";
import styled from "styled-components";
import { Row } from "@/styles/flex";

export default createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  
  @keyframes fade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    color : ${color.dark.light}
  }

  body, input, button {
    font-size : 0.875rem;
    font-family : system-ui,sans-serif;
    background-color : ${color.dark.background};
  }

  h1 {
    font-size : 2.3rem;
    color : ${color.dark.primaryHover};
    margin-bottom: 10px;
  }

  a {
    font-size : .7rem;
    color : ${color.dark.primaryHover}
  }

  button {
    cursor: pointer;
  }
`;

interface IContainer {
  paddingY: string;
  paddingX: string;
  marginB?: string;
}

export const Container = styled.section<IContainer>`
  padding: ${props => props.paddingY} ${props => props.paddingX};
  margin-bottom: ${props => props.marginB ?? '0px'};
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

interface ICard {
  top?: number;
  bottom?: number;
}

export const Card = styled.section<ICard>`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.top ?? 20}px;
  margin-bottom: ${props => props.bottom ?? 0}px;
  padding: 1.8rem;
  background-color: ${color.dark.secondary};
  position: relative;
  width: 100%;
  border-radius:8px;

  h4 {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 15px;
  }
`

interface IOverflow {
  align?: string;
}

export const Overflow = styled.div<IOverflow>`
    position: absolute;
    background-color: ${color.dark.overflow};
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: ${props => props.align ?? 'flex-start'};
    justify-content: center;
    animation: fade .3s;
    z-index: 1000;
    padding: 50px 20px;
`

export const InitialBall = styled.div`
  height: 45px;
  width: 45px;
  background-color: ${color.dark.light};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

interface IInputSection {
  type?: string;
  cursor?: string;
}

export const InputSection = styled.section<IInputSection>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom:17px;
  
  label {
    font-weight: 600;
    margin-bottom:7px;
    font-size: 0.9em;
    cursor: ${props => props.cursor ?? 'default'};
  }
  

  ${props => ['password', 'text', 'email'].includes(props?.type ?? 'text') && css`
    input[type=text],input[type=password],input[type=email],select{
      background-color:transparent;
      border:1px solid ${color.dark.borderColor};
      height:40px;
      border-radius:8px;
      padding: 2px 20px;
      margin-bottom: 10px;
      font-size:0.8rem;

      &:active,&:focus {
        border:1px solid ${color.dark.hoverBorderColor};
      }
      
    }

    select {
      -webkit-appearance: none;
      background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='${color.dark.light}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
      background-position: calc(100% - 0.75rem) center !important;
    }

    textarea{
      background-color:transparent;
      border:1px solid ${color.dark.borderColor};
      resize: none;
      border-radius:8px;
      padding: 15px 20px;
      margin-bottom: 10px;
      font-size:0.8rem;

      &:active,&:focus {
        border:1px solid ${color.dark.hoverBorderColor};
      }
    }
  `}  

  ${props => ['checkbox'].includes(props?.type ?? 'text') && css`
    input[type=checkbox]{
      display:none;
    }

    i {
      height: 20px;
      width: 34px;
      border-radius: 999px;
      margin-left:10px;
      position:relative;
      transition: .2s;

      &:before {
        content: '';
        position: absolute;
        height: 14px;
        width: 14px;
        background-color: ${color.dark.light};
        border-radius: 100%;
        margin: 3px;
      }
    }
    
    label[data-checked=true] {
      i {
        background-color:${color.dark.primary};
        &:before {
          right: 0;
        }
      }
    }

    label[data-checked=false] {
      i {
        background-color:${color.dark.dark};
        &:before {
          left: 0;
        }
      }
    }    
  `}    
`

interface IButton {
  marginBottom?: number;
  theme: string;
}

export const Button = styled.button<IButton>`
  width: 100%;
  border: none;
  font-size: .7rem;
  height: 45px;
  border-radius: 8px;
  transition: .4s;
  margin-bottom: ${props => props.marginBottom ?? 0}px;
  position: relative;

  ${props => props.theme == "primary" && css`
    background-color: ${color.dark.primary};
    &:hover:enabled {
      background-color: ${color.dark.primaryHover};
    }
  `}
`

interface IProgressBar {
  total: number,
  current: number
}

export const ProgressBar = styled.div<IProgressBar>`
  width: 100%;
  height: 8px;
  background-color: ${color.dark.dark};
  border-radius: 8px;
  position: relative;

  &:before {
    content: '';
    display: flex;
    z-index: 1;
    background-color: ${color.dark.primary};
    top: 0;
    width: ${props => (props.current / props.total) * 100}%;
    max-width: 100%;
    min-width:0;
    transition: .4s;
    height: 100%;
    border-radius: 8px;
  }
`

export const LoadingOverflow = styled.div`
  cursor: progress;
  content: '';
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${color.dark.overflow};
  border-radius: 8px;
`

interface ILoadingSpinner {
  size?: number;
  background?: string;
  color?: string;
}

export const LoadingSpinner = styled.div<ILoadingSpinner>`
  border: 2px solid ${props => props?.background ?? color.dark.light};
  border-top: 2px solid ${props => props?.color ?? color.dark.primary};
  border-radius: 50%;
  width: ${props => props.size ?? 20}px;
  height: ${props => props.size ?? 20}px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

interface IForm {
  blocked?: boolean;
  marginY?: string;
  marginX?: string;
}

export const Form = styled.form<IForm>`
  position: relative;
  margin: ${props => props.marginY ?? '0px'} ${props => props.marginX ?? '0px'} ${props => props.marginX ?? '0px'} ${props => props.marginX ?? '0px'}};
  z-index: 0;
  ${props => props.blocked && css`
    &:before {
      content: '';
      display: flex;
      z-index: 1;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `}
`

interface ITopBar {
  marginBottom?: string;
}

export const TopBar = styled.section<ITopBar>`
  padding: 7px 0;
  display:flex;
  align-items: center;
  margin-bottom: ${props => props.marginBottom ?? '0px'};
`;

interface ITopRight {
  width?: string;
}

export const TopRight = styled.section<ITopRight>`
  margin-left: auto;
  width: ${props => props.width ?? 'auto'};
`;

export const CloseButton = styled.button`
  background-color : ${color.dark.primary};
  border-radius: 100%;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: -5px;
  right: -5px;
  transition: .4s;
  &:hover {
    background-color: ${color.dark.primaryHover};
  }
`

export const CardItem = styled.button`
  background-color: ${color.dark.backgroundDarkest};
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
  border: none;
  transition: .4s;
  font-weight: bold;

  &:hover {
    background-color: ${color.dark.background};
  }
`


export const ItemList = styled(Row)`
  margin-top: 20px;
  h3 {
    bolder;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  small {
    color: ${color.dark.light};
  }
`

interface IArrow {
  direction: string;
  size?: number;
}

export const Arrow = styled.div<IArrow>`
  content: ' ';
  margin: 0 10px;
  width: ${props => props.size ?? 30}px;
  height: ${props => props.size ?? 30}px;
  background-size: cover!important;
  transform: rotate(${props => props.direction == 'bottom' ? '0deg' : (props.direction == 'left' ? '90deg' : (props.direction == 'right' ? '270deg' : '180deg'))});
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='${color.dark.light}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
`

interface IB {
  color?: string;
}

export const B = styled.b<IB>`
  color: ${props => props.color ?? color.dark.primary};
`

export const ShowOnlySmall = styled.div`
  display: none;
  @media ${size.small} {
    display: block;
  }
`
