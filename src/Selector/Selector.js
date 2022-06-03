import styled from 'styled-components'
import CorpusSelector from '../CorpusSelector'

import { SelectedButton } from '../styles'
import Filters from './Filters'
import ItemBrowser from './ItemBrowser'

const PageSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-area: page-selector;
`

const Navigation = styled.nav`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-areas:
    "corpus-label corpuses"
    "filter-label filters"
    "page-selector page-selector";
  grid-row-gap: 2px;
`

const PageSelector = ({
  pages,
  openTab = '',
  onChangeTab,
  translate,
}) => {
  return (
    <PageSelectorWrapper>{pages.map(({name}) => (
      <SelectedButton
        key={name}
        onClick={()=>onChangeTab(name)}
        selected={openTab===name}
      >
        {translate(name)}
      </SelectedButton>))}
    </PageSelectorWrapper>
  )
}

function Selector({
  openTab,
  onChangeTab,
  creation,
  corpus,
  isCorpus,
  dbs,
  filters,
  translate,
  onCreationChange,
  onFilterChange,
  corpuses,
  onCorpusChange,
  selectedCorpus
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

  const selectedPageItems = pages.filter(({name}) => name === openTab)

  const handleCreationChange = (type, list) => {
    onCreationChange({
      ...creation,
      [type]: list
    })
  }
  
  return (
    <div>
        <Navigation>
          <CorpusSelector
            corpuses={corpuses}
            translate={translate}
            onCorpusChange={onCorpusChange}
            selectedCorpus={selectedCorpus}
          />
          <Filters
            onFilterChange={onFilterChange}
            filters={filters}
            translate={translate}
          />
          <PageSelector
            openTab={openTab}
            pages={pages}
            onChangeTab={onChangeTab}
            translate={translate}
          />
        </Navigation>
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
            translate={translate}
          />
        ))}
    </div>
  );
}

export default Selector;
