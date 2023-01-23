import { color } from "@/styles/variables";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    color : ${color.light}
  }

  body, input, button {
    font-family : Roboto, sans-serif;
    background-color : ${color.background};
  }

  h1 {
    font-size : 2.5rem;
    color : ${color.primary}
  }

  a {
    color : ${color.primary}
  }

  button {
    cursor: pointer;
  }
`;

export const Container = styled.section`
  padding: 2rem;
  width: 100%;
`;

export const Card = styled.div`
  padding: 2rem;
  background-color: ${color.secondary};
  border-radius:8px;
`


