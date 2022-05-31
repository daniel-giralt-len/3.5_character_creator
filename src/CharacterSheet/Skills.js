import styled from 'styled-components'
import skills from '../db/json/skills.json'

import {
    CounterInput,
    BoldText,
    SmallText,
    BlackLabel,
} from './sharedComponents'


const SkillsLayout = styled.ul``

function Skills({
        scores,
        bonuses,
        translate,
        onSkillChange,
        skillRanks
    }){
        return(
                <SkillsLayout>
                    <SmallText>{translate('name').toUpperCase()}</SmallText>
                    <SmallText>{translate('total').toUpperCase()}</SmallText>
                    <SmallText>{translate('base').toUpperCase()}</SmallText>
                    <SmallText>{translate('race').toUpperCase()}</SmallText>
                    {Object
                        .entries(scores)
                        .map(([id, value]) => (
                            <>
                                <BlackLabel
                                    name={translate(id)}
                                    subtitle={translate(`${id}_long`)}
                                />
                                <BoldText>
                                    {value+bonuses[id]}
                                </BoldText>
                                <CounterInput 
                                    type="number"
                                    step="1"
                                    value={value}
                                    name={id}
                                    id={id}
                                    max={50}
                                    min={0}
                                    onChange={e => onScoreChange(id, e.target.value)}
                                />
                                <span>
                                    {bonuses[id]}
                                </span>
                            </>
                        ))
                    }
                </SkillsLayout>
        )
}

export default Skills