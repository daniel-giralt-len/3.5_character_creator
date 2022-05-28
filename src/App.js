import { useState } from 'react';
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
const HeaderWrapper = styled.div``
const LeftWrapper = styled.div`grid-area: left;`
const RightWrapper = styled.div`grid-area: right;`

function App() {
  const [character, setCharacter] = useState(characterBase)
  const [corpus, setCorpus] = useState({})
  const [isCorpus, setIsCorpus] = useState(false)
  const [selectedCorpus, setSelectedCorpus] = useState('c44')
  const [translations, setTranslation] = useState(webTranslations['es'])

  const translate = strIn => {
    const str = strIn.toLowerCase()
    return ((translations && translations[str]) || (webTranslations['*'] && webTranslations['*'][str]) || strIn)
  }
  

  const corpuses = {
    any: {name: translate('any book'), corpus: '*'},
    c44: {name: 'Companyia 44', corpus: corpus44 },
  }

  const handleCreationChange = newCreation => isCorpus ? setCorpus(newCreation) : setCharacter(newCreation)
  const handleCorpusChange = e => setSelectedCorpus(e.target.value)

  const usedCreation = isCorpus ? corpus : character
  const usedCorpus = corpuses[selectedCorpus].corpus

  const handleCreationSwitch = () => setIsCorpus(!isCorpus)
  const handleChangeTranslations = key => setTranslation(webTranslations[key])

  return (
    <div>
        <HeaderWrapper>
          <Header
            handleCreationSwitch={handleCreationSwitch}
            handleChangeTranslations={handleChangeTranslations}
            translate={translate}
            isCorpus={isCorpus}
          />
        </HeaderWrapper>
        <ContentWrapper>
          <LeftWrapper>
            <CorpusSelector 
              isCorpus={isCorpus}
              corpuses={corpuses}
              translate={translate}
              handleCorpusChange={handleCorpusChange}
              selectedCorpus={selectedCorpus}
            />
            <Creator 
              creation={usedCreation}
              onCreationChange={handleCreationChange}
              corpus={usedCorpus}
              isCorpus={isCorpus}
              dbs={dbs}
              translate={translate}
            />
          </LeftWrapper>
          <RightWrapper>
            <CreationDisplay
              isCharacter={!isCorpus}
              creation={isCorpus ? corpus : character}
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
