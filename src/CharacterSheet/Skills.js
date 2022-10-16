import styled from 'styled-components'
import skillsData from '../db/json/skills.json'
import SkillItem from './SkillItem'

import {
    Text,
    SidewaysBlackLabel,
    ErrorTooltip
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
        "header header header header header header"
        "class name total ranks score error";
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
        selectedLevelIndex,
        errors
    }){
        const handleSkillChange = (id, points) => onSkillChange({id, points: parseInt(points)})
        const isChangeable = selectedLevelIndex !== 0
        
        const refinedSkillsData = skillsData
                .filter(({id})=>permittedSkills === '*' || permittedSkills.includes(id)) //remove skills not allowed in the corpus
                .concat(...extraSkills)
                .map(s => ({...s, translatedName: translate(s.name, 'skills')}))
                .sort((a,b) => a.translatedName.localeCompare(b.translatedName))

        const OverallErrorMessage = errors.isLevelOverBudget && (<ErrorTooltip 
            message={translate('error skill total over budget', undefined, {
                spentPoints: skillPoints.nUsed.current,
                maxPoints: skillPoints.nAvailable.current
            })}
        />)

        return (
                <SkillsLayout>
                    <HeaderWrapper
                        name={translate('skills').toUpperCase()}
                        subtitles={[
                            `${skillPoints.nUsed.current}/${skillPoints.nAvailable.current} (${skillPoints.nAvailable.added})`,
                            `${translate('max ranks')}: ${skillRanks.maxPerSkill}`,
                        ]}
                        warning={errors.isLevelOverBudget}
                    >
                        {OverallErrorMessage}
                    </HeaderWrapper>
                    <Text small centered/>
                    <Text small centered>{translate('name')}</Text>
                    <Text small centered>{translate('ranks')}</Text>
                    <Text small centered>{translate('base')}</Text>
                    <Text small centered>{translate('points')}</Text>
                    <Text small centered/>
                    {
                        refinedSkillsData.map(skill =>{
                            const scoreName = skill['key ability']
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
                                isSkillOverBudget={errors.isOverBudget[skill.id]}
                                maxRanks={skillRanks.maxPerSkill}
                            />)
                        })
                     }
                </SkillsLayout>
        )
}

export default Skills