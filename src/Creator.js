import ItemBrowser from './ItemBrowser'
import { useState } from 'react';

function Creator({creation,
  onCreationChange,
  corpus,
  isCorpus,
  dbs,
  translate
}) {

  const pages = [
    { name: 'races',       isExclusive: true},
    { name: 'classes',     },
    { name: 'feats',       },
    { name: 'skilltricks', },
    { name: 'language',    },
    { name: 'rulebooks',   isUsableOnlyInCorpus: true  },
    { name: 'editions',    isUsableOnlyInCorpus: true  },
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
          {pages.map(({name}) => (<button key={name} onClick={()=>setSelectedPage(name)}>{translate(name)}</button>))}
        </nav>
          {pages.filter(({name}) => name === selectedPage).map(({name, isExclusive, isUsableOnlyInCorpus}) => (
            <ItemBrowser
              key={name}
              handleCreationChange={list => handleCreationChange(name, list)}
              selected={creation[name]}
              items={dbs[name]}
              permittedCorpus={corpus}
              itemType={name}
              isCorpus={isCorpus}
              isExclusive={!isCorpus && isExclusive}
              disabled={isUsableOnlyInCorpus && !isCorpus}
              dbs={dbs}
            />
          ))}
    </div>
  );
}

export default Creator;
