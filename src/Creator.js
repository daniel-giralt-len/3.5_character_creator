import ItemBrowser from './ItemBrowser'
import Filters from './Filters'
import { useState } from 'react';

const PageSelector = ({
  pages,
  onSelectPage,
  translate
}) => {
  return (
    <div>{pages.map(({name}) => (
      <button key={name} onClick={()=>onSelectPage(name)}>
        {translate(name)}
      </button>))}
    </div>
  )
}

function Creator({
  creation,
  corpus,
  isCorpus,
  dbs,
  filters,
  translate,
  onCreationChange,
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
  const selectedPageItems = pages.filter(({name}) => name === selectedPage)

  const handleCreationChange = (type, list) => {
    onCreationChange({
      ...creation,
      [type]: list
    })
  }
  
  return (
    <div>
        <nav>
          <Filters
            selectedPage={selectedPage}
            onFilterChange={onFilterChange}
            filters={filters}
            translate={translate}
          />
          <PageSelector
            pages={pages}
            onSelectPage={setSelectedPage}
            translate={translate}
          />
        </nav>
        {selectedPageItems.map(({name, isExclusive, isUsableOnlyInCorpus}) => (
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
