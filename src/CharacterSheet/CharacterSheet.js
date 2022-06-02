import styled from 'styled-components'
import Name from './Name'
import Race from './Race'
import Scores from './Scores'
import Saves from './Saves'
import ClassNames from './ClassNames'
import Feats from './Feats'
import ClassesDetail from './ClassesDetail'
import Skills from './Skills'
import Bab from './Bab'

import raceStats from '../db/json/itemData/raceStats.json'
import calculateMaxFeats from "../functions/calculateMaxFeats";
import calculateCharacterBonuses from "../functions/calculateCharacterBonuses";
import getCharacterSkillData from '../functions/getCharacterSkillData';

const CharacterSheetLayout = styled.section`
    max-width: 1000px;
    display: grid;

    box-shadow: 1px 1px 4px 0px #340000;
    margin: 2px 10px 0px 0px;
    padding: 10px;
    border-radius: 2px;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 19em 8em 2em;
    grid-row-gap: 15px;
    grid-column-gap: 10px;

    grid-template-areas: 
        "name class-names"
        "race class-names"
        "scores skills"
        "saves skills"
        "bab skills"
        "feats skills"
        "classes skills"
        "skilltricks skills";
        ". skills";
`

const SkilltricksLayout = styled.div`
    grid-area: skilltricks;
`

function CharacterSheet({
        character,
        translate,
        onCreationChange,
        onChangeSelectorTab
    }){
        const {
            scores,
            classes,
            feats,
            races,
            name,
            skills
        } = character

        const raceData = (raceStats[races] || {})
        const bonuses = calculateCharacterBonuses({raceData, classes})
        const modifiers = Object.keys(scores).reduce((acc,id)=>({...acc, [id]: Math.floor(((scores[id] || 0) + (bonuses[id] || 0) - 10)/2)}),{})

        const selectedFeats = Object
            .entries(feats)
            .filter(([_, selected])=>selected)
            .reduce((acc,[id])=>({...acc,[id]:true}),{})
        const maxFeats = calculateMaxFeats({raceData, classes})
        const usedFeats = (Object.values(selectedFeats).filter(v=>v)||[]).length
        const classSkillsData = getCharacterSkillData(classes, bonuses, raceData)
        
        const handleCharacterChange = scores => onCreationChange({...character, scores})
        
        const onNameChange = name => onCreationChange({ ...character, name })
        const onScoreChange = (score, value) => handleCharacterChange({ ...scores, [score]: parseInt(value) })
        const onSkillChange = skills => onCreationChange({...character, skills})
        const onClassChange = classes => onCreationChange({...character, classes})
        const onFeatsChange = feats => onCreationChange({...character, feats})
        
        return(
            <CharacterSheetLayout>
                <Name
                    name={name}
                    translate={translate}
                    onNameChange={onNameChange}
                />
                <Race
                    race={raceData.name}
                    translate={translate}
                    onChangeSelectorTab={onChangeSelectorTab}
                />
                <ClassNames
                    classes={classes}
                    translate={translate}
                    onChangeSelectorTab={onChangeSelectorTab}
                />
                <Scores
                    scores={scores}
                    bonuses={bonuses}
                    modifiers={modifiers}
                    translate={translate}
                    onScoreChange={onScoreChange}
                />
                <Saves
                    bonuses={bonuses}
                    modifiers={modifiers}
                    translate={translate}
                /> 
                <Skills
                    scores={scores}
                    bonuses={bonuses}
                    modifiers={modifiers}
                    skills={skills}
                    classSkillsData={classSkillsData}
                    translate={translate}
                    onSkillChange={onSkillChange}
                />
                <Bab
                    translate={translate}
                    bab={bonuses.bab}
                />
                <Feats 
                    feats={selectedFeats}
                    translate={translate}
                    onFeatsChange={onFeatsChange}
                    maxFeats={maxFeats}
                    usedFeats={usedFeats}
                />
                <SkilltricksLayout></SkilltricksLayout>
                <ClassesDetail
                    classes={classes}
                    translate={translate}
                    handleClassChange
                />
            </CharacterSheetLayout>
        )
}

export default CharacterSheet