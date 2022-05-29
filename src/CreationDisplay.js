import findInDb from "./functions/findInDb";

import ScoreDisplay from "./displays/ScoreDisplay";
import ClassDisplay from "./displays/ClassDisplay";
import RaceDisplay from "./displays/RaceDisplay";

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

function CreationDisplay({creation, dbs, translate, handleCreationChange, isCharacter}) {
  if(isCharacter){
    const {
      scores,
      classes,
      races,
      bab,
      saves,
      ...rest
    } = creation

    const handleScoreChange = scores => handleCreationChange({...creation, scores})
    const handleClassChange = classes => handleCreationChange({...creation, classes})

    return (
      <div>
        {isCharacter && (
            <>
              <ScoreDisplay
                scores={scores}
                translate={translate}
                handleScoreChange={handleScoreChange}
                bab={bab}
                saves={saves}
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
              />
            </>
          )
        }
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
      </div>
    )
  }
  
  
}

export default CreationDisplay;
