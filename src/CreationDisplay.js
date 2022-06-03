import styled from 'styled-components'

import findInDb from "./functions/findInDb";
import ScoreDisplay from "./displays/ScoreDisplay";
import ClassDisplay from "./displays/ClassDisplay";
import RaceDisplay from "./displays/RaceDisplay";
import FeatDisplay from "./displays/FeatDisplay";

import raceStats from './db/json/itemData/raceStats.json'
import calculateCharacterBonuses from "./functions/calculateCharacterBonuses";
import calculateMaxFeats from "./functions/calculateMaxFeats";

const CodeArea = styled.div`
  border: 1px solid black;
`

const CreationDisplayLayout = styled.section`
  h3{
    margin-top: 10px;
    margin-bottom: 3px;
  }
  ul{
    margin-top: 5px;
    margin-bottom: 5px;
  }
`

const GenericDisplay = ({type, items, translate, dbs}) => (
  <div key={type}>
    <h3>{translate(type)}</h3>
    <ul>
      {Object.entries(items).filter(([n,v])=>v).map(([n])=>
      (<li key={n}>
        {findInDb(type, n).name}
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
      feats,
      ...rest
    } = creation
    const raceData = raceStats[races]
    const bonuses = calculateCharacterBonuses({raceData, classes})
    const selectedFeats = Object
      .entries(feats)
      .filter(([_, selected])=>selected)
      .reduce((acc,[id])=>({...acc,[id]:true}),{})
    const nFeats = calculateMaxFeats({raceData, classes})
    const usedFeats = (Object.values(selectedFeats).filter(v=>v)||[]).length

    const handleScoreChange = scores => handleCreationChange({...creation, scores})
    const handleClassChange = classes => handleCreationChange({...creation, classes})
    const handleFeatsChange = feats => handleCreationChange({...creation, feats})

    return (
      <CreationDisplayLayout>
        <ScoreDisplay
          baseAbilityScores={scores}
          translate={translate}
          handleScoreChange={handleScoreChange}
          bab={bab}
          saves={saves}
          scoreBonuses={bonuses}
          usedFeats={usedFeats}
          maxFeats={nFeats}
        /> 
        <FeatDisplay
          feats={selectedFeats}
          dbs={dbs}
          onFeatsChange={handleFeatsChange}
          translate={translate}
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
        {Object.entries(rest).map(([type, items]) => ( //TODO: feats before race and languages
          <GenericDisplay
            key={type}
            type={type}
            items={items}
            translate={translate}
            dbs={dbs}
          />
        ))}
      </CreationDisplayLayout>
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
        <CodeArea>{JSON.stringify(creation)}</CodeArea>
      </div>
    )
  }
  
  
}

export default CreationDisplay;
