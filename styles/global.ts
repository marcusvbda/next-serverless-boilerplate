import { color } from "@/styles/variables";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
    background : ${color.dark.background};
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
    // color : ${color.dark.light}  
  }

  body, input, button {
    font-family : system-ui,sans-serif;
    overflow-x: hidden;
  }

  h1 {
    font-size : 2.3rem;
    // color : ${color.dark.primaryHover};
    margin-bottom: 10px;
  }

  a {
    font-size : .7rem;
    // color : ${color.dark.primaryHover}
  }

  button {
    cursor: pointer;
  }
`;