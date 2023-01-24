import { color } from "@/styles/variables";
import { createGlobalStyle } from "styled-components";
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
    font-size : 2.5rem;
    color : ${color.dark.primary}
  }

  a {
    color : ${color.dark.primary}
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
  padding: 2rem;
  background-color: ${color.dark.secondary};
  border-radius:8px;
`

export const InputRow = styled.section<ICard>`
  display: flex;
  flex-direction: column;
  margin-bottom:20px;
  
  label {
    font-weight: 600;
    margin-bottom:5px;
    font-size: 0.9em;
  }

  input {
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
`