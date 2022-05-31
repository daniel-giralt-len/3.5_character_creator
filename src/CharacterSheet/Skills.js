import styled from 'styled-components'
import skillsData from '../db/json/skills.json'
import SkillItem from './SkillItem'

import {
    SmallText,
    fullCenteredText,
    BlackLabel
} from './sharedComponents'

const HeaderWrapper = styled(BlackLabel)`
    height: 2em;
    flex-direction: row;
    justify-content: space-around;
    grid-area: header;
    background: #000;
    color: #FFF;
    padding: 2px 8px;
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

const Title = styled(SmallText)`
    ${fullCenteredText}
`

function Skills({
        skills,
        modifiers,
        translate,
        onSkillChange
    }){

        const handleSkillChange = (name,rank) => onSkillChange({...skills, [name]:{...skills[name], nRanks: parseInt(rank)}})

        return(
                <SkillsLayout>
                    <HeaderWrapper
                        name={translate('skills').toUpperCase()}
                        subtitle={'Points'}
                    />
                    <Title>{translate('class')}</Title>
                    <Title>{translate('name')}</Title>
                    <Title>{translate('total')}</Title>
                    <Title>{translate('base')}</Title>
                    <Title>{translate('ranks')}</Title>
                    {
                        skillsData.map(skill =>{
                            const data = skills[skill.name] || {}
                            const scoreName = skill['key ability']
                            return (<SkillItem
                                key={skill.name}
                                isClass={skill.isClass}
                                isTrainedOnly={skill['trained only']}
                                armorCheckPenalty={skill['armor check penalty']}
                                name={skill.name}
                                nRanks={data.nRanks}
                                scoreName={scoreName}
                                modifierValue={modifiers[scoreName]}
                                onRankChange={handleSkillChange}
                                translate={translate}
                            />)
                        })
                    }
                </SkillsLayout>
        )
}

export default Skills