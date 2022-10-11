import styled from 'styled-components'
import skillsData from '../db/json/skills.json'
import SkillItem from './SkillItem'

import {
    Text,
    SidewaysBlackLabel
} from '../sharedComponents'

const HeaderWrapper = styled(SidewaysBlackLabel)`
    grid-area: header;
`

const SkillsLayout = styled.ul`
    margin: 0;
    padding: 0;

    grid-area: skills;

    display: grid;
    grid-template-areas: 
        "header header header header header"
        "class name total ranks score";
    grid-row-gap: 2px;
    grid-column-gap: 5px;

    * {
        display: flex;
        align-items: center;
    }
`

function Skills({
        translate,
        modifiers,
        skillPoints,
        skillRanks,
        classSkills,
        onSkillChange,
        permittedSkills,
        extraSkills,
        selectedLevelIndex
    }){
        const handleSkillChange = (id, points) => onSkillChange({id, points: parseInt(points)})
        const isChangeable = selectedLevelIndex !== 0
        const isOverallOverbudget = skillPoints.nUsed.added > skillPoints.nAvailable.added
        
        const refinedSkillsData = skillsData
                .filter(({id})=>permittedSkills === '*' || permittedSkills.includes(id)) //remove skills not allowed in the corpus
                .concat(...extraSkills)
                .map(s => ({...s, translatedName: translate(s.name, 'skills')}))
                .sort((a,b) => a.translatedName.localeCompare(b.translatedName))

        return (
                <SkillsLayout>
                    <HeaderWrapper
                        name={translate('skills').toUpperCase()}
                        subtitle={`${skillPoints.nUsed.added}/${skillPoints.nAvailable.added}`}
                        warning={isOverallOverbudget}
                    >
                        {`${translate('max ranks')}: ${skillRanks.maxPerSkill}`}
                    </HeaderWrapper>
                    <Text small centered>{translate('class')}</Text>
                    <Text small centered>{translate('name')}</Text>
                    <Text small centered>{translate('ranks')}</Text>
                    <Text small centered>{translate('base')}</Text>
                    <Text small centered>{translate('points')}</Text>
                    {
                        refinedSkillsData.map(skill =>{
                            const scoreName = skill['key ability']
                            const isSkillOverBudget = skillRanks.added[skill.id] > skillRanks.maxPerSkill
                            return (<SkillItem
                                key={skill.name}
                                isClass={classSkills.includes(skill.id)}
                                isTrainedOnly={skill['trained only']}
                                armorCheckPenalty={skill['armor check penalty']}
                                id={skill.id}
                                name={skill.name}
                                label={skill.translatedName}
                                ranks={skillRanks}
                                points={skillPoints}
                                scoreName={scoreName}
                                modifierValue={modifiers[scoreName]}
                                onPointsChange={handleSkillChange}
                                translate={translate}
                                enabled={isChangeable}
                                isSkillOverBudget={isSkillOverBudget}
                            />)
                        })
                     }
                </SkillsLayout>
        )
}

export default Skills