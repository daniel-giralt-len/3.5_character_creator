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

import SkillTricks from './SkillTricks'
import ClassAbilities from './ClassAbilities'

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
        "classes alignment"
        "classes skills"
        "scores skills"
        "saves skills"
        "bab skills"
        "class-skills skills"
        "feats skills"
        "languages skilltricks";
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

function CharacterSheet({
        character,
        currentLevelData,
        currentLevelErrors,
        selectedLevelIndex,
        translate,
        onClassChange,
        onCreationChange,
        onChangeSelectorTab,
        onSelectedLevelChange,
        usedCorpus,
        fullClassList,
        classErrorList
    }){
        const {
            scores,
            bonuses,
            modifiers,
            featSlots,
            name,
            classSkills,
            skillPoints,
            skillRanks,
            alignment,
            language,
            nKnownLanguages,
            maxKnownLanguages,
            raceData,
            skillTricks,
            classAbilities,
        } = currentLevelData

        const onNameChange = name => onCreationChange({ name }, 'name')
        const onScoreChange = (score, value) => onCreationChange({ score, value: parseInt(value), }, 'scores')
        const onSkillChange = ({id, points}) => onCreationChange({id, points}, 'skillPoints')
        const onFeatsChange = feats => onCreationChange({...character, feats})
        const onLanguagesChange = language => onCreationChange({ language })
        const onAlignmentChange = alignment => onCreationChange({ alignment }, 'alignment')
        const handleSkillRemoving = nLevel => onCreationChange({nLevel}, 'removeSkillTrick')

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
                {/* <ClassNames
                    classes={fullClassList}
                    translate={translate}
                    onChangeSelectorTab={onChangeSelectorTab}
                /> */}
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
                <ClassAbilities
                    classAbilities={classAbilities.added}
                    translate={translate}
                />
                <Skills
                    modifiers={modifiers}
                    skillPoints={skillPoints}
                    skillRanks={skillRanks}
                    classSkills={classSkills.added}
                    translate={translate}
                    onSkillChange={onSkillChange}
                    permittedSkills={usedCorpus.skills}
                    extraSkills={usedCorpus.extraSkills}
                    selectedLevelIndex={selectedLevelIndex}
                    errors={currentLevelErrors.skills}
                />
                <Feats 
                    featSlots={featSlots.added}
                    totalSlots={featSlots.total}
                    translate={translate}
                    selectedLevelIndex={selectedLevelIndex}
                />
                <SkillTricks
                    skillTricks={skillTricks.added}
                    skillPointsUsed={skillTricks.pointsUsed}
                    translate={translate}
                    errors={currentLevelErrors.skillTricks}
                    onSkillRemove={handleSkillRemoving}
                    selectedLevelIndex={selectedLevelIndex}
                />
                <ClassesDetail
                    classes={fullClassList}
                    translate={translate}
                    handleClassChange={onClassChange}
                    onSelectedLevelChange={onSelectedLevelChange}
                    selectedLevelIndex={selectedLevelIndex}
                    errors={classErrorList}
                />
                <Languages
                    languages={language}
                    translate={translate}
                    maxLanguages={maxKnownLanguages}
                    usedLanguages={nKnownLanguages}
                    onLanguagesChange={onLanguagesChange}
                    automaticLanguages={raceData['automatic languages'] || []}
                    errors={currentLevelErrors.language}
                /> 
            </CharacterSheetLayout>
        )
}

export default CharacterSheet