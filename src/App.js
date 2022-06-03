import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CharacterCreatorPage from './CharacterCreatorPage'

const App = () => (
  <Router>
    <Routes>
      <Route path="/corpus" element={<CorpusCreatorPage />} />
      <Route path="/" element={<CharacterCreatorPage/>} />
    </Routes>
  </Router>
)

export default App