import { useCookies } from 'react-cookie'
import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import queryString from 'query-string';

import CharacterSheet from './CharacterSheet'
import Selector from './Selector/Selector'
import Header from './Header'
import CorpusSelector from './CorpusSelector'
import CreationDisplay from './CreationDisplay'

import characterBase from './db/json/characterBase.json'
import corpus44 from './db/json/corpus_44.json'
import dbs from './db/json/dbs.json'

import getTranslator from './functions/getTranslator'


const GlobalStyle = createGlobalStyle`
  html, button, input, textarea {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
  }
  button {
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
    background: none;
    box-shadow: 0px 0px 1px 0px #340000;
    margin: 2px;
    transition: box-shadow .3s;
  }
  button:hover { box-shadow: 0 0 3px 0px #340000; }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 
    "header header-selector"
    "left right";
  @media (max-width: 700px) {
    grid-template-columns: auto;
    grid-template-areas: 
      "header"
      "left"
      "header-selector"
      "right";
  }
`
const LeftWrapper = styled.div`grid-area: left;`
const RightWrapper = styled.div`grid-area: right;`

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['character','corpus', 'filters'])
  const {corpus, character, selectedCorpus, language, filters} = cookies
  if(!corpus) setCookie('corpus', {})
  if(!character || Object.keys(character).length === 0) setCookie('character', characterBase)
  if(!selectedCorpus) setCookie('selectedCorpus', 'c44')
  if(!language) setCookie('language', 'es')
  if(!filters) {
    setCookie('filters', {
      showDisallowed: true    
    })
  }
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [selectorItem, setSelectorItem] = useState('races')
  
  const translate = getTranslator(language)
  const handleCreationChange = newCreation => setCookie('character', newCreation)
  const handleCorpusChange = id => setCookie('selectedCorpus', id)
  const handleChangeTranslations = key => setCookie('language', key)
  const handleFilterChange = newFilters => setCookie('filters', newFilters)

  const handleChangeSelectorTab = item => {
    setIsSelectorOpen(true)
    setSelectorItem(item)
  }
  const handleSwitchSelectorOpen = () => setIsSelectorOpen(!isSelectorOpen)
  
  const corpuses = {
    any: {name: translate('any book'), corpus: '*'},
    c44: {name: 'Companyia 44', corpus: corpus44 },
  }
  const usedCorpus = corpuses[selectedCorpus].corpus

  return (<ContentWrapper>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,500;0,700;0,900;1,200;1,500;1,700&display=swap" rel="stylesheet"></link>
    <GlobalStyle />
    <Header
      handleChangeTranslations={handleChangeTranslations}
      translate={translate}
      selectedLanguage={language}
      isSelectorOpen={isSelectorOpen}
      onSelectorSwitch={handleSwitchSelectorOpen}
    />
    <LeftWrapper>
      <CharacterSheet
        character={character}
        onCreationChange={handleCreationChange}
        translate={translate}
        onChangeSelectorTab={handleChangeSelectorTab}
      />
    </LeftWrapper>
    <RightWrapper>
      {isSelectorOpen && (<>
        <CorpusSelector
          corpuses={corpuses}
          translate={translate}
          onCorpusChange={handleCorpusChange}
          selectedCorpus={selectedCorpus}
        />
        <Selector 
          openTab={selectorItem}
          onChangeTab={handleChangeSelectorTab}
          creation={character}
          corpus={usedCorpus}
          isCorpus={false}
          dbs={dbs}
          filters={filters}
          translate={translate}
          onCreationChange={handleCreationChange}
          onFilterChange={handleFilterChange}
      />
      </>)}
    </RightWrapper>
  </ContentWrapper>)
/* 
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,500;0,700;1,200;1,500;1,700&display=swap" rel="stylesheet"></link>
      <GlobalStyle />
      <Header
        handleCreationSwitch={handleCreationSwitch}
        handleChangeTranslations={handleChangeTranslations}
        translate={translate}
        isCorpus={isCorpus}
        selectedLanguage={language}
      />
      <ContentWrapper>
        <LeftWrapper>
          {isCharacter && (
            <CorpusSelector 
              corpuses={corpuses}
              translate={translate}
              onCorpusChange={handleCorpusChange}
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
  ); */
}

export default App;
