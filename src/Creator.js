import ItemBrowser from './ItemBrowser'
import Filters from './Filters'
import { useState } from 'react';

function Creator({creation,
  onCreationChange,
  corpus,
  isCorpus,
  dbs,
  translate,
  filters,
  onFilterChange
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
          <div>
            <Filters
              selectedPage={selectedPage}
              onFilterChange={onFilterChange}
              filters={filters}
              translate={translate}
            />
          </div>
          <div>{pages.map(({name}) => (<button key={name} onClick={()=>setSelectedPage(name)}>{translate(name)}</button>))}</div>
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
              userFilters={filters}
            />
          ))}
    </div>
  );
}

export default Creator;
