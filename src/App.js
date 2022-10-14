import { createGlobalStyle } from 'styled-components'
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import CharacterCreatorPage from './CharacterCreatorPage'
import CorpusCreatorPage from './CorpusCreatorPage'

const GlobalStyle = createGlobalStyle`
  html, button, input, textarea {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
  }
  button {
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
    background: none;
    box-shadow: 0px 0px 1px 0px #340000;
    margin: 2px;
    transition: box-shadow .3s;
  }
  button:hover { box-shadow: 0 0 3px 0px #340000; }
`;

const App = () => (
  <>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,500;0,700;0,900;1,200;1,500;1,700&display=swap" rel="stylesheet"></link>
    <GlobalStyle />
    <HashRouter>
      <Routes>
        <Route path="/" element={<CharacterCreatorPage/>} />
        <Route path="/corpus" element={<CorpusCreatorPage />} />
      </Routes>
    </HashRouter>
  </>
)

export default App