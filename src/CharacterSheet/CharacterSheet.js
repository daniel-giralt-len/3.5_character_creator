import styled from 'styled-components'
import Name from './Name'
import Race from './Race'
import Scores from './Scores'
import Saves from './Saves'
import ClassNames from './ClassNames'
import Feats from './Feats'
import Alignment from './Alignment'
import ClassesDetail from './ClassesDetail'
import Skills from './Skills'
import Bab from './Bab'

import raceStats from '../db/json/itemData/raceStats.json'
import checkFeatsPrerequisites from "../functions/checkFeatsPrerequisites";
import calculateMaxFeats from "../functions/calculateMaxFeats";
import calculateCharacterBonuses from "../functions/calculateCharacterBonuses";
import getCharacterSkillData from '../functions/getCharacterSkillData';
import getModifiersFromScores from '../functions/getModifiersFromScores'

const CharacterSheetLayout = styled.section`
    display: grid;

    box-shadow: 1px 1px 4px 0px #340000;
    margin: 2px 10px 0px 0px;
    padding: 10px;
    border-radius: 2px;

    
    grid-row-gap: 15px;
    grid-column-gap: 10px;
   
    max-width: 1000px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
        "name race"
        "class-names alignment"
        "scores skills"
        "saves skills"
        "bab skills"
        "feats skills"
        "classes skills"
        "skilltricks skills"
        ". skills";
    @media (max-width: 700px) {
        grid-template-columns: auto;
        grid-template-rows: auto auto auto auto auto auto;
        grid-template-areas: 
            "name"
            "alignment"
            "race"
            "class-names"
            "scores"
            "saves"
            "bab"
            "feats"
            "classes"
            "skilltricks"
            "skills";
    }
`

const SkilltricksLayout = styled.div`
    grid-area: skilltricks;
`

function CharacterSheet({
        character,
        translate,
        onCreationChange,
        onChangeSelectorTab,
        usedCorpus
    }){
        const {
            scores,
            classes,
            feats,
            races,
            name,
            skills,
            alignment
        } = character

        const nLevels = classes.length
        const raceData = (raceStats[races] || {})
        const bonuses = calculateCharacterBonuses({raceData, classes})
        const modifiers = getModifiersFromScores(scores, bonuses)

        const selectedFeats = Object
            .entries(feats)
            .filter(([_, selected])=>selected)
            .reduce((acc,[id])=>({...acc,[id]:true}),{})
        const maxFeats = calculateMaxFeats({raceData, classes})
        const usedFeats = (Object.values(selectedFeats).filter(v=>v)||[]).length
        const classSkillsData = getCharacterSkillData(classes, modifiers, raceData)
        const fullCharacter = {
            ...character,
            bonuses,
            modifiers
        }
        const prerequisiteList = checkFeatsPrerequisites(fullCharacter)


        const handleCharacterChange = scores => onCreationChange({...character, scores})
        
        const onNameChange = name => onCreationChange({ ...character, name })
        const onScoreChange = (score, value) => handleCharacterChange({ ...scores, [score]: parseInt(value) })
        const onSkillChange = skills => onCreationChange({...character, skills})
        const onClassChange = classes => onCreationChange({...character, classes})
        const onFeatsChange = feats => onCreationChange({...character, feats})
        const onAlignmentChange = alignment => onCreationChange({...character, alignment})

        return(
            <CharacterSheetLayout>
                <Name
                    name={name}
                    translate={translate}
                    onNameChange={onNameChange}
                />
                <Race
                    raceName={raceData.name}
                    translate={translate}
                    onChangeSelectorTab={onChangeSelectorTab}
                />
                <ClassNames
                    classes={classes}
                    translate={translate}
                    onChangeSelectorTab={onChangeSelectorTab}
                />
                <Alignment
                    alignment={alignment}
                    onAlignmentChange={onAlignmentChange}
                    translate={translate}
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
                    modifiers={modifiers}
                    skills={skills}
                    classSkillsData={classSkillsData}
                    translate={translate}
                    onSkillChange={onSkillChange}
                    maxPointsPerSkill={3+nLevels}
                    permittedSkills={usedCorpus.skills}
                    extraSkills={usedCorpus.extraSkills}
                />
                <Bab
                    translate={translate}
                    bab={bonuses.bab}
                />
                <Feats 
                    character={fullCharacter}
                    feats={selectedFeats}
                    translate={translate}
                    onFeatsChange={onFeatsChange}
                    maxFeats={maxFeats}
                    usedFeats={usedFeats}
                />
                <SkilltricksLayout />
                <ClassesDetail
                    classes={classes}
                    translate={translate}
                    handleClassChange={onClassChange}
                />
            </CharacterSheetLayout>
        )
}

export default CharacterSheet