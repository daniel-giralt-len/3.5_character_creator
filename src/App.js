import ItemBrowser from './ItemBrowser'
import dbs from './dbs.json'

function App() {
  return (
    <div>
      <ItemBrowser items={dbs.classes}/>
    </div>
  );
}

export default App;
