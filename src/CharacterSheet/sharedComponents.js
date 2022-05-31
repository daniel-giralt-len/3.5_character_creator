import styled from 'styled-components'

const fullCenteredText = `display: flex;
align-items: center;
justify-content: center;`


const border = `2px solid black;`
const boxed = `border: ${border}`
const underlined = `border-bottom: ${border};`

const TextInput = styled.textarea`
    resize: none;
    font-size: 1.5em;
    padding: 10px 10px;
    border-color: #000;
    margin: 10px;
    width: -webkit-fill-available;
    ${boxed}
`

const CounterInput = styled.input`
    ${boxed}
    padding: 0px 5px;
`

const SkillModCounterInput = styled.input`${underlined}`

const SkillClassCheckbox = styled.input`${boxed}`

const ReadOnlyInput = styled.span`
    ${underlined}
`

const BlackLabelWrapper = styled.div`
    ${fullCenteredText}
    background: #000;
    color: #FFF;
    display: flex;
    flex-direction: column;
    padding: 2px 8px;
`
const BoldText = styled.span`
    font-weight: 900;
    font-size: 1.3em;
`
const SmallText = styled.span`
    font-size: 0.75em;
    font-weight: 500;
`

const BlackLabel = ({name, subtitle})=>(
    <BlackLabelWrapper>
        <BoldText>{name}</BoldText>
        {subtitle && (<SmallText>{subtitle}</SmallText>)}
    </BlackLabelWrapper>
)

export {
    fullCenteredText,
    border,
    boxed,
    underlined,
    TextInput,
    CounterInput,
    SkillModCounterInput,
    SkillClassCheckbox,
    ReadOnlyInput,
    BlackLabelWrapper,
    BoldText,
    SmallText,
    BlackLabel,
}