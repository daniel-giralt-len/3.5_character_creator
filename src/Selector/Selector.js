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
    <PageSelectorWrapper>{
      Object.keys(pages).map(name => (
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

  const pages = {
    races: {isExclusive: true},
    classes: {},
    feats: {},
    skilltricks: {},
    language: {},
    rulebooks: {},
    editions: {},
  }

  const isCharacter = !isCorpus

  if(isCharacter){
    pages.rulebooks.disabled = true
    pages.rulebooks.editions = true
  }

  const openPage = pages[openTab]

  const handleCreationChange = (type, list) => {
    onCreationChange({
      ...creation,
      [type]: list
    })
  }
  
  return (
    <div>
        <Navigation>
          {isCharacter && <CorpusSelector
            corpuses={corpuses}
            translate={translate}
            onCorpusChange={onCorpusChange}
            selectedCorpus={selectedCorpus}
          />}
          {filters && <Filters
            onFilterChange={onFilterChange}
            filters={filters}
            translate={translate}
          />}
          <PageSelector
            openTab={openTab}
            pages={pages}
            onChangeTab={onChangeTab}
            translate={translate}
          />
        </Navigation>
        {
          <ItemBrowser
            key={openTab}
            onCreationChange={list => handleCreationChange(openTab, list)}
            selected={creation[openTab]}
            items={dbs[openTab]}
            permittedCorpus={corpus}
            itemType={openTab}
            isCorpus={isCorpus}
            isExclusive={isCharacter && openPage.isExclusive}
            disabled={openPage.disabled}
            dbs={dbs}
            userFilters={filters}
            translate={translate}
          />
        }
    </div>
  );
}

export default Selector;
