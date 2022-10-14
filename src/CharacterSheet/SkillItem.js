import styled from 'styled-components'

import {
    boxed,
    CounterInput,
    ErrorTooltip,
    Text
} from '../sharedComponents'

const SkillClassCheckbox = styled.div`
    width: 0.75em;
    height: 0.75em;
    background: ${({checked}) => checked ? 'black' : ' white'};
    ${boxed}
`

const SkillName = styled(Text)`
    margin-right: 4px;
`

const CheckboxWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const NameWrapper = styled.div`
    display: flex;
    justify-content: space-between
`


const SkillItem = ({
    isClass,
    isTrainedOnly,
    armorCheckPenalty,
    name,
    label,
    id,
    ranks,
    points,
    scoreName,
    modifierValue,
    onPointsChange,
    translate,
    enabled,
    isSkillOverBudget
})=>{

    const baseSectionText = `${modifierValue}${ranks.added[id] ? `+${ranks.added[id]}` : ''}`

    return (<>
        <CheckboxWrapper>
            <SkillClassCheckbox
                checked={isClass}
                type='checkbox'
            />
        </CheckboxWrapper>
        <NameWrapper>
            <div>
                <SkillName small warning={isSkillOverBudget}>{`${label}${armorCheckPenalty?'*':''}`}</SkillName>
                {isTrainedOnly && <Text small>▉</Text>}
            </div>
            <SkillName small>{`(${translate(scoreName)})`}</SkillName>
        </NameWrapper>
        <Text warning={isSkillOverBudget} box centered>{modifierValue+Math.floor(ranks.added[id]||0)}</Text>
        <Text warning={isSkillOverBudget} small centered underline>{baseSectionText}</Text>
        <CounterInput 
            warning={isSkillOverBudget}
            underline
            type="number"
            step="1"
            value={points.current[id] || 0}
            name={name}
            id={name}
            max={999}
            min={0}
            onChange={e => onPointsChange(id, e.target.value)}
            disabled={!enabled}
        />
        {isSkillOverBudget ? (<ErrorTooltip message='Too many points' />) : (<div/>)}
    </>)
}

export default SkillItem