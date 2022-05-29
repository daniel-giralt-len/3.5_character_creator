import { useCookies } from 'react-cookie'
import styled from 'styled-components'

import Creator from './Creator'
import Header from './Header'
import CorpusSelector from './CorpusSelector'
import CreationDisplay from './CreationDisplay'

import characterBase from './db/json/characterBase.json'
import corpus44 from './db/json/corpus_44.json'
import dbs from './db/json/dbs.json'

import webTranslations from './translations/webTranslations.json'

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 
    "left right";
`
const LeftWrapper = styled.div`grid-area: left;`
const RightWrapper = styled.div`grid-area: right;`

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['character','corpus','isCorpusSelected', 'filters'])
  const {corpus, character, selectedCorpus, language, isCorpusSelected, filters} = cookies
  if(!corpus) setCookie('corpus', {})
  if(!character || Object.keys(character).length === 0) setCookie('character', characterBase)
  if(!selectedCorpus) setCookie('selectedCorpus', 'c44')
  if(!language) setCookie('language', 'es')
  if(!isCorpusSelected) setCookie('isCorpusSelected', false)
  if(!filters) {
    setCookie('filters', {
      showDisallowed: true    
    })
  }
  const isCorpus = isCorpusSelected === 'true'
  const isCharacter = !isCorpus
  const translations = webTranslations[language]
  
  const translate = strIn => {
    const str = strIn.toLowerCase()
    return ((translations && translations[str]) || (webTranslations['*'] && webTranslations['*'][str]) || strIn)
  }
  const handleCreationChange = newCreation => isCorpus 
    ? setCookie('corpus', newCreation)
    : setCookie('character', newCreation)
  const handleCorpusChange = e => setCookie('selectedCorpus', e.target.value)
  const handleCreationSwitch = () => setCookie('isCorpusSelected', !isCorpus)
  const handleChangeTranslations = key => setCookie('language', key)
  const handleFilterChange = newFilters => setCookie('filters', newFilters)
  
  const corpuses = {
    any: {name: translate('any book'), corpus: '*'},
    c44: {name: 'Companyia 44', corpus: corpus44 },
  }
  const usedCreation = isCorpus ? corpus : character
  const usedCorpus = corpuses[selectedCorpus].corpus

  return (
    <div>
        <Header
          handleCreationSwitch={handleCreationSwitch}
          handleChangeTranslations={handleChangeTranslations}
          translate={translate}
          isCorpus={isCorpus}
        />
        <ContentWrapper>
          <LeftWrapper>
            {isCharacter && (
              <CorpusSelector 
                corpuses={corpuses}
                translate={translate}
                handleCorpusChange={handleCorpusChange}
                selectedCorpus={selectedCorpus}
              />
            )}
            <Creator 
              creation={usedCreation}
              corpus={usedCorpus}
              isCorpus={isCorpus}
              dbs={dbs}
              filters={filters}
              translate={translate}
              onCreationChange={handleCreationChange}
              onFilterChange={handleFilterChange}
            />
          </LeftWrapper>
          <RightWrapper>
            <CreationDisplay
              isCharacter={!isCorpus}
              creation={usedCreation}
              dbs={dbs}
              translate={translate}
              handleCreationChange={handleCreationChange}
            />
          </RightWrapper>
        </ContentWrapper>
    </div>
  );
}

export default App;
