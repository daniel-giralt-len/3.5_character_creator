import { useState } from 'react';
import Creator from './Creator'

import corpus44 from './db/json/corpus_44.json'

function App() {
  const [creation, setCreation] = useState({})
  const [isCorpus, setIsCorpus] = useState(false)
  const [selectedCorpus, setSelectedCorpus] = useState('c44')

  const corpuses = {
    any: {name: 'Any book', corpus: '*'},
    c44: {name: 'Companyia 44', corpus: corpus44 },
  }

  const handleCreationChange = newCreation => setCreation(newCreation)
  const handleCorpusChange = e => setSelectedCorpus(e.target.value)

  return (
    <div>
        <div>
          <button onClick = {() => setIsCorpus(!isCorpus)}>Switch</button>
          <span>{isCorpus ? 'Creating a corpus' : 'Creating a character'}</span>
        </div>
        {!isCorpus && (<div>
          Selected corpus: 
          <div>
            {Object.entries(corpuses).map(([id, {name}]) => (
                <span >
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
          creation={creation}
          onCreationChange={handleCreationChange}
          corpus={corpuses[selectedCorpus].corpus}
        />
        <div>
          {JSON.stringify(creation)}
        </div>
    </div>
  );
}

export default App;
