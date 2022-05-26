import findInDb from "./findInDb";

function CreationDisplay({creation, dbs, translate}) {
  return (
    <div>
      {Object.entries(creation).map(([type, items]) => (
        <div key={type}>
          <h3>{translate(type)}</h3>
          <ul>
            {Object.entries(items).filter(([n,v])=>v).map(([n])=>
            (<li key={n}>
              {findInDb(dbs,type, n).name}
            </li>)
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CreationDisplay;
