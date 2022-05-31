import styled from 'styled-components'

const fullCenteredText = `display: flex;
align-items: center;
justify-content: center;`


const border = `2px solid black;`
const boxed = `border: ${border}
border-radius: 0px;
`
const underlined = `
border: 0px;
border-bottom: ${border}
border-radius: 0px;
`

const TextInput = styled.textarea`
    resize: none;
    font-size: 1.5em;

    padding: 2px 5px;
    margin: 0;

    border-color: #000;
    width: -webkit-fill-available;
    rows: 1;
    ${underlined}
    &:focus{
        outline: none;
    }
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
const SmallTextWrapper = styled.span`
    font-size: 0.75em;
    font-weight: 500;
`

const SmallText = ({children}) => (<SmallTextWrapper>{children.toUpperCase()}</SmallTextWrapper>)

const BlackLabel = ({name, subtitle})=>(
    <BlackLabelWrapper>
        <BoldText>{name.toUpperCase()}</BoldText>
        {subtitle && (<SmallText>{subtitle.toUpperCase()}</SmallText>)}
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