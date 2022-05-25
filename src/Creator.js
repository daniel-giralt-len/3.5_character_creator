import dbs from './db/json/dbs.json'
import ItemBrowser from './ItemBrowser'
import { useState } from 'react';

import RulebookItem from './items/RulebookItem'
import RaceItem from './items/RaceItem'
import ClassItem from './items/ClassItem'
import FeatItem from './items/FeatItem'
import SkilltrickItem from './items/SkilltrickItem'
import LanguageItem from './items/LanguageItem'

function Creator({creation, onCreationChange}) {
  const [page, setPage] = useState('races')
  const handleCreationChange = (type, list) => {
    onCreationChange({
      ...creation,
      [type]: list
    })
  }
  return (
    <div>
        <nav>
          <button onClick={()=>setPage('rulebooks')}>Rulebooks</button>
          <button onClick={()=>setPage('races')}>Races</button>
          <button onClick={()=>setPage('classes')}>Classes</button>
          <button onClick={()=>setPage('feats')}>Feats</button>
          <button onClick={()=>setPage('skilltricks')}>Skilltricks</button>
          <button onClick={()=>setPage('language')}>Language</button>
        </nav>
          {page === 'rulebooks' && <ItemBrowser
            handleCreationChange={list => handleCreationChange('rulebooks', list)}
            selected={creation.rulebooks}
            items={dbs.rulebooks}
            ItemRenderer={RulebookItem} />}
          {page === 'races' && <ItemBrowser
            handleCreationChange={list => handleCreationChange('races', list)}
            selected={creation.races}
            items={dbs.races}
            ItemRenderer={RaceItem} />}
          {page === 'classes' && <ItemBrowser
            handleCreationChange={list => handleCreationChange('classes', list)}
            selected={creation.classes}
            items={dbs.classes}
            ItemRenderer={ClassItem} />}
          {page === 'feats' && <ItemBrowser
            handleCreationChange={list => handleCreationChange('feats', list)}
            selected={creation.feats}
            items={dbs.feats}
            ItemRenderer={FeatItem} />}
          {page === 'skilltricks' && <ItemBrowser
            handleCreationChange={list => handleCreationChange('skilltricks', list)}
            selected={creation.skilltricks}
            items={dbs.skilltricks}
            ItemRenderer={SkilltrickItem} />}
          {page === 'language' && <ItemBrowser
            handleCreationChange={list => handleCreationChange('language', list)}
            selected={creation.language}
            items={dbs.language}
            ItemRenderer={LanguageItem} />}
    </div>
  );
}

export default Creator;
