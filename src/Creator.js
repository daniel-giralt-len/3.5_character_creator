import dbs from './db/json/dbs.json'
import ItemBrowser from './ItemBrowser'
import { useState } from 'react';

import RulebookItem from './items/RulebookItem'
import RaceItem from './items/RaceItem'
import ClassItem from './items/ClassItem'
import FeatItem from './items/FeatItem'
import SkilltrickItem from './items/SkilltrickItem'
import LanguageItem from './items/LanguageItem'

function Creator({creation, onCreationChange, corpus}) {

  const pages = [
    { name: 'rulebooks', Component: RulebookItem },
    { name: 'races', Component: RaceItem },
    { name: 'classes', Component: ClassItem },
    { name: 'feats', Component: FeatItem },
    { name: 'skilltricks', Component: SkilltrickItem },
    { name: 'language', Component: LanguageItem },
  ]

  const [selectedPage, setSelectedPage] = useState('races')
  const handleCreationChange = (type, list) => {
    onCreationChange({
      ...creation,
      [type]: list
    })
  }
  
  return (
    <div>
        <nav>
          {pages.map(({name}) => (<button onClick={()=>setSelectedPage(name)}>{name}</button>))}
        </nav>
          {pages.filter(({name}) => name === selectedPage).map(({name, Component}) => (
            <ItemBrowser
              handleCreationChange={list => handleCreationChange(name, list)}
              selected={creation[name]}
              items={dbs[name]}
              ItemRenderer={Component}
              permittedCorpus={corpus}
              itemType={name}
            />
          ))}
    </div>
  );
}

export default Creator;
