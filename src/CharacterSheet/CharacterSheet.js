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
import Languages from './Languages'

import checkFeatsPrerequisites from "../functions/checkFeatsPrerequisites";
import calculateMaxFeats from "../functions/calculateMaxFeats";
import getCharacterClassAbilities from '../functions/getCharacterClassAbilities'

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
        "classes skills"
        "feats skills"
        "skilltricks skills"
        "languages skills";
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
        currentLevelData,
        selectedLevelIndex,
        translate,
        onClassChange,
        onCreationChange,
        onChangeSelectorTab,
        onSelectedLevelChange,
        usedCorpus,
        fullClassList,
    }){
        const {
            scores,
            bonuses,
            modifiers,
            feats,
            races,
            name,
            classSkills,
            skillPoints,
            skillRanks,
            alignment,
            language,
            nKnownLanguages,
            maxKnownLanguages,
            raceData,
        } = currentLevelData

/* 
        const selectedFeats = Object
            .entries(feats)
            .filter(([_, selected])=>selected)
            .reduce((acc,[id])=>({...acc,[id]:true}),{})
        const maxFeats = calculateMaxFeats({raceData, classes})
        const usedFeats = (Object.values(selectedFeats).filter(v=>v)||[]).length
        const fullCharacter = {
            ...character,
            bonuses,
            modifiers,
            raceData,
            classAbilities: getCharacterClassAbilities({classes})
        }
        const prerequisiteList = checkFeatsPrerequisites(fullCharacter)
 */

        const onNameChange = name => onCreationChange({ name }, 'name')
        const onScoreChange = (score, value) => onCreationChange({ score, value: parseInt(value), }, 'scores')
        const onSkillChange = ({id, points}) => onCreationChange({id, points}, 'skillPoints')
        const onFeatsChange = feats => onCreationChange({...character, feats})
        const onLanguagesChange = language => onCreationChange({ language })
        const onAlignmentChange = alignment => onCreationChange({ alignment }, 'alignment')

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
                    classes={fullClassList}
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
                <Bab
                    translate={translate}
                    bab={bonuses.bab}
                />
                <Skills
                    modifiers={modifiers}
                    skillPoints={skillPoints}
                    skillRanks={skillRanks.added}
                    classSkills={classSkills}
                    translate={translate}
                    onSkillChange={onSkillChange}
                    permittedSkills={usedCorpus.skills}
                    extraSkills={usedCorpus.extraSkills}
                />
                {/*
                <Feats 
                    character={fullCharacter}
                    feats={selectedFeats}
                    translate={translate}
                    onFeatsChange={onFeatsChange}
                    maxFeats={maxFeats}
                    usedFeats={usedFeats}
                />
                */}
                <SkilltricksLayout />
                <ClassesDetail
                    classes={fullClassList}
                    translate={translate}
                    handleClassChange={onClassChange}
                    onSelectedLevelChange={onSelectedLevelChange}
                    selectedLevelIndex={selectedLevelIndex}
                />
                <Languages
                    languages={language}
                    translate={translate}
                    maxLanguages={maxKnownLanguages}
                    usedLanguages={nKnownLanguages}
                    onLanguagesChange={onLanguagesChange}
                    automaticLanguages={raceData['automatic languages'] || []}
                /> 
            </CharacterSheetLayout>
        )
}

export default CharacterSheet