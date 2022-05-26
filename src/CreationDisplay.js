import findInDb from "./findInDb";

import ScoreDisplay from "./displays/ScoreDisplay";

function CreationDisplay({creation, dbs, translate, handleCreationChange}) {
  const {
    scores,
    bab,
    saves,
    ...rest
  } = creation
  
  const handleScoreChange = scores => handleCreationChange({...creation, scores})
  
  return (
    <div>
      <ScoreDisplay scores={scores} translate={translate} handleScoreChange={handleScoreChange} />
      <h3>{translate('bab')}: {bab}</h3>
      <div>
          <h3>{translate('saves')}</h3>
          <ul>
              {Object
                  .entries(saves)
                  .map(([score, value]) => (<li key={score}> {translate(score)}: {value} </li>))
              }
          </ul>
      </div>
      {Object.entries(rest).map(([type, items]) => (
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
