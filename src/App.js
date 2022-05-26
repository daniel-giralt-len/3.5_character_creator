import { useState } from 'react';
import styled from 'styled-components'

import Creator from './Creator'
import CreationDisplay from './CreationDisplay'

import characterBase from './db/json/characterBase.json'
import corpus44 from './db/json/corpus_44.json'
import dbs from './db/json/dbs.json'

import webTranslations from './translations/webTranslations.json'

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px auto;
  grid-template-areas: 
    "header header"
    "left right";
`
const HeaderWrapper = styled.div`grid-area: header;`
const LeftWrapper = styled.div`grid-area: left;`
const RightWrapper = styled.div`grid-area: right;`

function App() {
  const [character, setCharacter] = useState(characterBase)
  const [corpus, setCorpus] = useState({})
  const [isCorpus, setIsCorpus] = useState(false)
  const [selectedCorpus, setSelectedCorpus] = useState('c44')
  const [translations, setTranslation] = useState(webTranslations['es'])

  const translate = str => ((translations && translations[str]) || (webTranslations['*'] && webTranslations['*'][str]) || str)

  
  const languages = Object.keys(webTranslations).filter(v => v !== '*')

  const corpuses = {
    any: {name: translate('Any Book'), corpus: '*'},
    c44: {name: 'Companyia 44', corpus: corpus44 },
  }

  const handleCreationChange = newCreation => isCorpus ? setCorpus(newCreation) : setCharacter(newCreation)
  const handleCorpusChange = e => setSelectedCorpus(e.target.value)

  const usedCreation = isCorpus ? corpus : character
  const usedCorpus = corpuses[selectedCorpus].corpus

  return (
    <AppWrapper>
        <HeaderWrapper>
          <>
            <button onClick = {() => setIsCorpus(!isCorpus)}>{translate('switch')}</button>
            <span>{isCorpus ? translate('creating a corpus') : translate('creating a character')}</span>
          </>
          <>
            {languages.map(key => (
              <button
                key={key}
                onClick={() => setTranslation(webTranslations[key])}
              >
                {translate(key)}
              </button>
            ))}
          </>
        </HeaderWrapper>
        <LeftWrapper>
          {!isCorpus && (<div>
            {translate('selected corpus')}
            <div>
              {Object.entries(corpuses).map(([id, {name}]) => (
                  <span key={id}>
                    <input
                      onChange={handleCorpusChange}
                      type='radio'
                      name='corpus'
                      value={id}
                      key={id}
                      checked={selectedCorpus===id} 
                    />
                    {translate(name)}
                  </span>
                ))
              }
            </div>  
          </div>)}
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
            creation={isCorpus ? corpus : character}
            dbs={dbs}
            translate={translate}
          />
        </RightWrapper>
    </AppWrapper>
  );
}

export default App;
