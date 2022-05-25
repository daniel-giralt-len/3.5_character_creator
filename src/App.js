import ItemBrowser from './ItemBrowser'
import dbs from './dbs.json'

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Races</Link>
          <Link to="classes">Classes</Link>
          <Link to="feats">Feats</Link>
          <Link to="skilltricks">Skilltricks</Link>
          <Link to="language">Language</Link>
        </nav>
        <Outlet />
        <Routes>
          <Route path="/" element={<ItemBrowser items={dbs.races} />} />
          <Route path="classes" element={<ItemBrowser items={dbs.classes} />} />
          <Route path="feats" element={<ItemBrowser items={dbs.feats} />} />
          <Route path="skilltricks" element={<ItemBrowser items={dbs.skilltricks} />} />
          <Route path="language" element={<ItemBrowser items={dbs.language} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
