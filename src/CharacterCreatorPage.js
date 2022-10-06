import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import CharacterSheet from './CharacterSheet'
import Selector from './Selector/Selector'
import Header from './Header'

import characterBase from './db/json/characterBase.json'
import characterByLevelBase from './db/json/characterByLevelBase.json'
import corpus44 from './db/json/corpuses/44.json'
import corpusAny from './db/json/corpuses/any.json'
import dbs from './db/json/dbs.json'

import clampInteger from './functions/clampInteger'
import getTranslator from './functions/getTranslator'
import getCumulativeLevels from './functions/getCumulativeLevels'

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr minmax(0,1fr);
  grid-template-areas: 
    "header header-selector"
    "left right";
  @media (max-width: 700px) {
    grid-template-columns: 100%;
    grid-template-areas: 
      "header"
      "left"
      "header-selector"
      "right";
  }
`
const LeftWrapper = styled.div`grid-area: left;`
const RightWrapper = styled.div`grid-area: right;`

const generateSelectorReadableLevel = (characterLevels, selectedCharacterLevel) => {
  const selectorReadableCharacterLevel = characterLevels[selectedCharacterLevel]
  selectorReadableCharacterLevel.classes = characterLevels.map(l=>l.class).filter(v=>v)
  return selectorReadableCharacterLevel
}

function CharacterCreatorPage() {
  const [cookies, setCookie] = useCookies(['characterLevels','corpus', 'filters'])
  const {characterLevels, selectedCorpus, language, filters} = cookies
  if(!characterLevels || Object.keys(characterLevels).length === 0) setCookie('characterLevels', characterBase)
  if(!selectedCorpus) setCookie('selectedCorpus', 'c44')
  if(!language) setCookie('language', 'es')
  if(!filters) {
    setCookie('filters', {
      showDisallowed: false 
    })
  }

  const [isSelectorOpen, setIsSelectorOpen] = useState(true)
  const [selectorItem, setSelectorItem] = useState('races')
  const [selectedCharacterLevel, setSelectedCharacterLevel] = useState((characterLevels||[]).length-1)
  const [fullCharacterDataByLevel, setFullCharacterDataByLevel] = useState(getCumulativeLevels(characterLevels, selectedCharacterLevel))
  const [selectorReadableLevel, setSelectorReadableLevel] = useState(generateSelectorReadableLevel(characterLevels, selectedCharacterLevel))

  const translate = getTranslator(language)
  const handleCreationChange = (creationChanges, type) => {
    const newCharacterLevels = [...characterLevels]
    if(type==='classes'){
      const newlySelectedClass = creationChanges.classes[creationChanges.classes.length-1]
      const newLevel = {
        ...characterByLevelBase,
        class: newlySelectedClass
      }
      newCharacterLevels.push(newLevel)
    }else if(type==='scores'){
      const { score, value } = creationChanges
      newCharacterLevels[selectedCharacterLevel].scores[score] = value
    }else if(type==='races'){
      newCharacterLevels[0].races = creationChanges.races
    }else if(type==='alignment'){
      newCharacterLevels[0].alignment = creationChanges.alignment
    }else if(type==='name'){
      newCharacterLevels[0].name = creationChanges.name
    }else{
      newCharacterLevels[selectedCharacterLevel] = {
        ...newCharacterLevels[selectedCharacterLevel],
        ...creationChanges
        }
      }
      setCookie('characterLevels', newCharacterLevels)
  }
  const handleClassChange = newIndicesList => {
    const newCharacterLevels = [
      characterLevels[0], //index 0 is the virtual level 0 (with race stuff)
      ...newIndicesList.map(index => characterLevels[index+1])
    ]
    const newSelectedCharacterLevel = clampInteger(selectedCharacterLevel, 0, newCharacterLevels.length-1)
    setSelectedCharacterLevel(newSelectedCharacterLevel)
    setCookie('characterLevels', newCharacterLevels)
  }
  useEffect(()=>{
    setFullCharacterDataByLevel(getCumulativeLevels(characterLevels, selectedCharacterLevel))
    setSelectorReadableLevel(generateSelectorReadableLevel(characterLevels, selectedCharacterLevel))
  }, [cookies, characterLevels, selectedCharacterLevel])
  const handleCorpusChange = id => setCookie('selectedCorpus', id)
  const handleChangeTranslations = key => setCookie('language', key)
  const handleFilterChange = newFilters => setCookie('filters', newFilters)
  const handleSelectedLevelChange = i => setSelectedCharacterLevel(i)

  const handleChangeSelectorTab = item => {
    setIsSelectorOpen(true)
    setSelectorItem(item)
  }
  const handleSwitchSelectorOpen = () => setIsSelectorOpen(!isSelectorOpen)
  
  const corpuses = {
    any: {name: translate('any book'), corpus: corpusAny},
    c44: {name: 'Companyia 44', corpus: corpus44 },
  }
  const usedCorpus = corpuses[selectedCorpus].corpus

  return (<ContentWrapper>
    <Header
      handleChangeTranslations={handleChangeTranslations}
      translate={translate}
      selectedLanguage={language}
      isSelectorOpen={isSelectorOpen}
      onSelectorSwitch={handleSwitchSelectorOpen}
    />
    <LeftWrapper>
      <CharacterSheet
        currentLevelData={fullCharacterDataByLevel[selectedCharacterLevel]}
        fullClassList={fullCharacterDataByLevel[fullCharacterDataByLevel.length-1].classes}
        onCreationChange={handleCreationChange}
        onClassChange={handleClassChange}
        translate={translate}
        onChangeSelectorTab={handleChangeSelectorTab}
        onSelectedLevelChange={handleSelectedLevelChange}
        selectedLevelIndex={selectedCharacterLevel}
        usedCorpus={usedCorpus}
      />
    </LeftWrapper>
    <RightWrapper>
      {isSelectorOpen && (<>
        <Selector 
          openTab={selectorItem}
          onChangeTab={handleChangeSelectorTab}
          creation={selectorReadableLevel}
          corpus={usedCorpus}
          corpuses={corpuses}
          onCorpusChange={handleCorpusChange}
          selectedCorpus={selectedCorpus}
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

export default CharacterCreatorPage;
