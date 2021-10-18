import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

export default createGlobalStyle`
  ${normalize}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
  }
  
  span, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, ol, ul,
  li, fieldset, form, label, legend, th, td, header, div {
    font-family: 'Montserrat', sans-serif;
  }
`;
