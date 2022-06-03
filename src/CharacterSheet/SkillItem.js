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
    name,
    nRanks=0,
    scoreName,
    modifierValue,
    onRankChange,
    translate
})=>{
    const calculatedRanks = parseInt(isClass ? nRanks : nRanks/2)
    return (<>
        <CheckboxWrapper>
            <SkillClassCheckbox
                checked={isClass}
                type='checkbox'
            />
        </CheckboxWrapper>
        <NameWrapper>
            <div>
                <SkillName small>{translate(name, 'skills')}</SkillName>
                {isTrainedOnly && <Text small>▉</Text>}
            </div>
            <SkillName small>{`(${translate(scoreName)})`}</SkillName>
        </NameWrapper>
        <Text box centered>{modifierValue+calculatedRanks}</Text>
        <Text small centered underline>{modifierValue}</Text>
        <CounterInput 
            underline
            type="number"
            step="1"
            value={nRanks}
            name={name}
            id={name}
            max={500}
            min={0}
            onChange={e => onRankChange(name, e.target.value)}
        />
    </>)
}

export default SkillItem