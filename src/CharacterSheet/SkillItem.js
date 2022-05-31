import styled from 'styled-components'

import {
    boxed,
    CounterInput,
    SmallText,
    BoldText
} from './sharedComponents'

const SkillClassCheckbox = styled.div`
    width: 0.75em;
    height: 0.75em;
    background: ${({checked}) => checked ? 'black' : ' white'};
    ${boxed}
`

const SkillName = styled(SmallText)`
    margin-right: 4px;
`

const CheckboxWrapper = styled.div`
display: flex;
justify-content: center;
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
})=>(
    <>
        <CheckboxWrapper>
            <SkillClassCheckbox
                checked={isClass}
                type='checkbox'
            />
        </CheckboxWrapper>
        <div>
            <SkillName>{translate(name)}</SkillName>
            {isTrainedOnly && <SmallText>▉</SmallText>}
            <SkillName>{`(${translate(scoreName)})`}</SkillName>
        </div>
        <BoldText box centered>{modifierValue+nRanks}</BoldText>
        <SmallText centered underline>{modifierValue}</SmallText>
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
    </>
)

export default SkillItem