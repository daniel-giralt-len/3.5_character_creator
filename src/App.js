import dbs from './db/json/dbs.json'
import { useState } from 'react';
import styled from 'styled-components'

import Creator from './Creator'
import CreationDisplay from './CreationDisplay'

import corpus44 from './db/json/corpus_44.json'

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
  const [character, setCharacter] = useState({})
  const [corpus, setCorpus] = useState({})
  const [isCorpus, setIsCorpus] = useState(false)
  const [selectedCorpus, setSelectedCorpus] = useState('c44')

  const corpuses = {
    any: {name: 'Any book', corpus: '*'},
    c44: {name: 'Companyia 44', corpus: corpus44 },
  }

  const handleCreationChange = newCreation => isCorpus ? setCorpus(newCreation) : setCharacter(newCreation)
  const handleCorpusChange = e => setSelectedCorpus(e.target.value)

  return (
    <AppWrapper>
        <HeaderWrapper>
          <button onClick = {() => setIsCorpus(!isCorpus)}>Switch</button>
          <span>{isCorpus ? 'Creating a corpus' : 'Creating a character'}</span>
        </HeaderWrapper>
        <LeftWrapper>
          {!isCorpus && (<div>
            Selected corpus: 
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
                    {name}
                  </span>
                ))
              }
            </div>  
          </div>)}
          <Creator 
            creation={isCorpus ? corpus : character}
            onCreationChange={handleCreationChange}
            corpus={corpuses[selectedCorpus].corpus}
            isCorpus={isCorpus}
            dbs={dbs}
          />
        </LeftWrapper>
        <RightWrapper>
          <CreationDisplay
            creation={isCorpus ? corpus : character}
            dbs={dbs}
          />
        </RightWrapper>
    </AppWrapper>
  );
}

export default App;
