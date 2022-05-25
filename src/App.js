import ItemBrowser from './ItemBrowser'
import dbs from './dbs.json'

import RaceItem from './items/RaceItem'
import ClassItem from './items/ClassItem'
import FeatItem from './items/FeatItem'
import SkilltrickItem from './items/SkilltrickItem'
import LanguageItem from './items/LanguageItem'

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
          <Route path="/" element={<ItemBrowser items={dbs.races} ItemRenderer={RaceItem} />} />
          <Route path="classes" element={<ItemBrowser items={dbs.classes} ItemRenderer={ClassItem} />} />
          <Route path="feats" element={<ItemBrowser items={dbs.feats} ItemRenderer={FeatItem} />} />
          <Route path="skilltricks" element={<ItemBrowser items={dbs.skilltricks} ItemRenderer={SkilltrickItem} />} />
          <Route path="language" element={<ItemBrowser items={dbs.language} ItemRenderer={LanguageItem} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
