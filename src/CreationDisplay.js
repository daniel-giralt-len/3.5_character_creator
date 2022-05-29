
import findInDb from "./functions/findInDb";
import ScoreDisplay from "./displays/ScoreDisplay";
import ClassDisplay from "./displays/ClassDisplay";
import RaceDisplay from "./displays/RaceDisplay";

import raceStats from './db/json/itemData/raceStats.json'
import calculateCharacterBonuses from "./functions/calculateCharacterBonuses";

const GenericDisplay = ({type, items, translate, dbs}) => (
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
)

function CreationDisplay({
  creation,
  dbs,
  translate,
  handleCreationChange,
  isCharacter
}) {
  if(isCharacter){
    const {
      scores,
      classes,
      races,
      bab,
      saves,
      ...rest
    } = creation
    
    const raceData = raceStats[races]
    const bonuses = calculateCharacterBonuses({raceData, classes})

    const handleScoreChange = scores => handleCreationChange({...creation, scores})
    const handleClassChange = classes => handleCreationChange({...creation, classes})

    return (
      <div>
        <ScoreDisplay
          baseAbilityScores={scores}
          translate={translate}
          handleScoreChange={handleScoreChange}
          bab={bab}
          saves={saves}
          scoreBonuses={bonuses}
        /> 
        <ClassDisplay
          dbs={dbs}
          classes={classes}
          translate={translate}
          handleClassChange={handleClassChange}
        />
        <RaceDisplay 
          id={races}
          dbs={dbs}
          translate={translate}
        />
        {Object.entries(rest).map(([type, items]) => (
          <GenericDisplay
            key={type}
            type={type}
            items={items}
            translate={translate}
            dbs={dbs}
          />
        ))}
      </div>
    );
  }else{
    return (
      <div>
        {Object.entries(creation).map(([type, items]) => (
          <GenericDisplay 
            key={type}
            type={type}
            items={items}
            translate={translate}
            dbs={dbs}
          />
        ))}
        <span>{JSON.stringify(creation)}</span>
      </div>
    )
  }
  
  
}

export default CreationDisplay;
