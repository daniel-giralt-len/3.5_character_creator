import { useState } from 'react';
import Creator from './Creator'

function App() {
  const [creation, setCreation] = useState({})
  const [isCorpus, setIsCorpus] = useState(false)

  const handleCreationChange = newCreation => setCreation(newCreation)

  return (
    <div>
        <nav>
          <button onClick = {() => setIsCorpus(!isCorpus)}>Switch</button>
          <span>{isCorpus ? 'Creating a corpus' : 'Creating a character'}</span>
        </nav>
        <Creator creation={creation} onCreationChange={handleCreationChange} />
        <footer>
          {JSON.stringify(creation)}
        </footer>
    </div>
  );
}

export default App;
