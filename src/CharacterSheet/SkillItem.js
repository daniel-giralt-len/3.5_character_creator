import styled from 'styled-components'

import {
    boxed,
    CounterInput,
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
    translate
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
                <SkillName small>{`${label}${armorCheckPenalty?'*':''}`}</SkillName>
                {isTrainedOnly && <Text small>▉</Text>}
            </div>
            <SkillName small>{`(${translate(scoreName)})`}</SkillName>
        </NameWrapper>
        <Text box centered>{modifierValue+Math.floor(ranks.added[id]||0)}</Text>
        <Text small centered underline>{baseSectionText}</Text>
        <CounterInput 
            underline
            type="number"
            step="1"
            value={points.current[id]}
            name={name}
            id={name}
            max={999}
            min={0}
            onChange={e => onPointsChange(id, e.target.value)}
        />
    </>)
}

export default SkillItem