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

const ReadOnlyInput = styled.span`
    ${underlined}
`

const BlackLabelWrapper = styled.div`
    ${fullCenteredText}
    background: #000;
    color: #FFF;
    flex-direction: column;
    padding: 2px 8px;
`
const BoldText = styled.span`
    font-weight: 900;
    font-size: 1.3em;
    ${({centered}) => centered ? fullCenteredText : ''}
    ${({box}) => box ? boxed : ''}
    ${({underline}) => underline ? underlined : ''}
`
const SmallTextWrapper = styled.div`
    font-size: 0.75em;
    font-weight: 500;
    ${({centered}) => centered ? fullCenteredText : ''}
    ${({box}) => box ? boxed : ''}
    ${({underline}) => underline ? underlined : ''}
`

const SmallText = ({children, className, ...rest}) => (<SmallTextWrapper
    className={className} 
    {...rest}
    >
        {children.toString().toUpperCase()}
    </SmallTextWrapper>
)

const BlackLabel = ({name, subtitle, className})=>(
    <BlackLabelWrapper className={className}>
        <BoldText>{name.toString().toUpperCase()}</BoldText>
        {subtitle && (<SmallText>{subtitle.toString().toUpperCase()}</SmallText>)}
    </BlackLabelWrapper>
)

export {
    fullCenteredText,
    border,
    boxed,
    underlined,
    TextInput,
    CounterInput,
    ReadOnlyInput,
    BlackLabelWrapper,
    BoldText,
    SmallText,
    BlackLabel,
}