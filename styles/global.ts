import { color } from "@/styles/variables";
import { createGlobalStyle, css } from "styled-components";
import styled from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    color : ${color.dark.light}
  }

  body, input, button {
    font-size : 0.875rem;
    font-family : Roboto, sans-serif;
    background-color : ${color.dark.background};
  }

  h1 {
    font-size : 2.3rem;
    color : ${color.dark.primaryHover}
  }

  a {
    color : ${color.dark.primaryHover}
  }

  button {
    cursor: pointer;
  }
`;

export const Container = styled.section`
  padding: 2rem;
  width: 100%;
`;

interface ICard {
  top?: number;
}

export const Card = styled.section<ICard>`
  margin-top: ${props => props.top ?? 0}px;
  padding: 1.8rem;
  background-color: ${color.dark.secondary};
  border-radius:8px;
`

interface IInputSection {
  type: string;
  cursor?: string;
}

export const InputSection = styled.section<IInputSection>`
  display: flex;
  flex-direction: column;
  margin-bottom:20px;
  
  label {
    font-weight: 600;
    margin-bottom:7px;
    font-size: 0.9em;
    cursor: ${props => props.cursor ?? 'default'};
  }
  

  ${props => ['password', 'text', 'email'].includes(props.type) && css`
    input[type=text],input[type=password],input[type=email]{
      background-color:transparent;
      border:1px solid rgba(255,255,255,0.1);
      height:40px;
      border-radius:8px;
      padding: 2px 20px;
      margin-bottom: 10px;
      font-size:0.8rem;

      &:active,&:focus {
        border:1px solid rgba(255,255,255,0.8);
      }
    }
  `}  

  ${props => ['checkbox'].includes(props.type) && css`
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
  isLoading?: boolean;
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
    &:hover {
      background-color: ${color.dark.primaryHover};
    }
  `}
  

  ${props => props.isLoading && css`
  cursor: progress;
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
      background-color: ${color.dark.overflow};
      border-radius: 8px;
    }
  `}

`