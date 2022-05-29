import { useState } from 'react';

import { SelectedButton } from './styles'
import Filters from './Filters'
import ItemBrowser from './ItemBrowser'

const PageSelector = ({
  pages,
  onSelectPage,
  translate,
  selectedPage = false,
}) => {
  return (
    <div>{pages.map(({name}) => (
      <SelectedButton
        key={name}
        onClick={()=>onSelectPage(name)}
        selected={selectedPage===name}
      >
        {translate(name)}
      </SelectedButton>))}
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
            onFilterChange={onFilterChange}
            filters={filters}
            translate={translate}
          />
          <PageSelector
            selectedPage={selectedPage}
            pages={pages}
            onSelectPage={setSelectedPage}
            translate={translate}
          />
        </nav>
        {selectedPageItems.map(({name, isExclusive, isUsableOnlyInCorpus}) => (
          <ItemBrowser
            key={name}
            onCreationChange={list => handleCreationChange(name, list)}
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
