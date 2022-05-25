import ItemBrowser from './ItemBrowser'
import { useState } from 'react';

import RulebookItem from './items/RulebookItem'
import RaceItem from './items/RaceItem'
import ClassItem from './items/ClassItem'
import FeatItem from './items/FeatItem'
import SkilltrickItem from './items/SkilltrickItem'
import LanguageItem from './items/LanguageItem'
import BaseItem from './items/BaseItem'

function Creator({creation, onCreationChange, corpus, isCorpus, dbs}) {

  const pages = [
    { name: 'races', Component: RaceItem },
    { name: 'classes', Component: ClassItem },
    { name: 'feats', Component: FeatItem },
    { name: 'skilltricks', Component: SkilltrickItem },
    { name: 'language', Component: LanguageItem },
    { name: 'rulebooks', Component: RulebookItem },
    { name: 'editions', Component: BaseItem },
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
          {pages.map(({name}) => (<button key={name} onClick={()=>setSelectedPage(name)}>{name}</button>))}
        </nav>
          {pages.filter(({name}) => name === selectedPage).map(({name, Component}) => (
            <ItemBrowser
              key={name}
              handleCreationChange={list => handleCreationChange(name, list)}
              selected={creation[name]}
              items={dbs[name]}
              ItemRenderer={Component}
              permittedCorpus={corpus}
              itemType={name}
              isCorpus={isCorpus}
              isExclusive={name === 'races'}
            />
          ))}
    </div>
  );
}

export default Creator;