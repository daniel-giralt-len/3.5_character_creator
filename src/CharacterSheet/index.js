import styled from 'styled-components'
import Scores from './Scores'
import raceStats from '../db/json/itemData/raceStats.json'
import calculateCharacterBonuses from "../functions/calculateCharacterBonuses";
import calculateMaxFeats from "../functions/calculateMaxFeats";


const CharacterSheetLayout = styled.section`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: 
        "name classNames"
        "scores skills"
        "saves skills"
        "bab skills"
        "feats skills"
        "skilltricks skills"
        "classes classes";
`

const NameLayout = styled.div`
    grid-area: name;
`
const ClassNamesLayout = styled.div`
    grid-area: classnames;
`
const SkillsLayout = styled.div`
    grid-area: skills;
`
const SavesLayout = styled.div`
    grid-area: saves;
`
const BabLayout = styled.div`
    grid-area: bab;
`
const FeatsLayout = styled.div`
    grid-area: feats;
`
const SkilltricksLayout = styled.div`
    grid-area: skilltricks;
`
const ClassesLayout = styled.div`
    grid-area: classes;
`

function CharacterSheet({
        character,
        translate,
        onCreationChange
    }){
        const {
            scores,
            saves,
            classes,
            feats,
            races,
            name
        } = character

        const raceData = raceStats[races]
        const selectedFeats = Object
            .entries(feats)
            .filter(([_, selected])=>selected)
            .reduce((acc,[id])=>({...acc,[id]:true}),{})
        const nFeats = calculateMaxFeats({raceData, classes})
        const usedFeats = (Object.values(selectedFeats).filter(v=>v)||[]).length
        
        const handleCharacterChange = scores => onCreationChange({...character, scores})
        
        const onScoreChange = (score, value) => handleCharacterChange({ ...scores, [score]: parseInt(value) })
        const onClassChange = classes => onCreationChange({...character, classes})
        const onFeatsChange = feats => onCreationChange({...character, feats})
        

        return(
            <CharacterSheetLayout>
                <NameLayout>{name}</NameLayout>
                <ClassNamesLayout>
                    
                </ClassNamesLayout>
                <Scores
                    character={character}
                    translate={translate}
                    onScoreChange={onScoreChange}
                />
                <SkillsLayout></SkillsLayout>
                <SavesLayout></SavesLayout>
                <BabLayout></BabLayout>
                <FeatsLayout></FeatsLayout>
                <SkilltricksLayout></SkilltricksLayout>
                <ClassesLayout></ClassesLayout>

            </CharacterSheetLayout>
        )
}

export default CharacterSheet