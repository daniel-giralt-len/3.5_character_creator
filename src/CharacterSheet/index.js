import styled from 'styled-components'
import Scores from './Scores'
import ClassNames from './ClassNames'
import raceStats from '../db/json/itemData/raceStats.json'
import calculateMaxFeats from "../functions/calculateMaxFeats";
import calculateCharacterBonuses from "../functions/calculateCharacterBonuses";

import { 
    TextInput,
    SmallText,
} from './sharedComponents';

const CharacterSheetLayout = styled.section`
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-row-gap: 15px;
    grid-column-gap: 10px;

    grid-template-areas: 
        "name class-names"
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
    grid-area: class-names;
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
            name,
            skillRanks
        } = character

        const raceData = raceStats[races]
        const bonuses = calculateCharacterBonuses({raceData, classes})
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
                <NameLayout>
                    <TextInput rows={1}>{name}</TextInput>
                    <SmallText>{translate('character name')}</SmallText>
                </NameLayout>
                <ClassNames
                    classes={classes}
                    translate={translate}
                />
                <Scores
                    scores={scores}
                    bonuses={bonuses}
                    translate={translate}
                    onScoreChange={onScoreChange}
                />
                <Scores
                    scores={scores}
                    bonuses={bonuses}
                    skillRanks={skillRanks}
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