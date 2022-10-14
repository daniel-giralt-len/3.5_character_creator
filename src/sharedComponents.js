import styled from 'styled-components'
import ReactTooltip from 'react-tooltip';

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
const smallText = `
font-size: 0.75em;
font-weight: 500;`

const boldText = `
font-weight: 900;
font-size: 1.3em;`

const warningStyle = `
color: #ff4444;
font-weight: bold;
background: #ff000033;`

const SquareButton = styled.button`${boxed}`

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
    padding: 0px 5px;

    border: 0;
    ${({centered}) => centered ? fullCenteredText : ''}
    ${({box}) => box ? boxed : ''}
    ${({underline}) => underline ? underlined : ''}
    ${({warning}) => warning ? warningStyle : ''};
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
    ${({warning}) => warning ? `
    color: #ff4444;
    font-weight: bold;
    ` : ''};
`

const TextWrapper = styled.div`
    ${({small}) => small ? smallText : ''}
    ${({bold}) => bold ? boldText : ''}
    ${({centered}) => centered ? fullCenteredText : ''}
    ${({box}) => box ? boxed : ''}
    ${({underline}) => underline ? underlined : ''}
    ${({warning}) => warning ? warningStyle : ''};
`

const Text = ({children='', className, ...rest}) => (<TextWrapper
    className={className} 
    {...rest}
    >
        {children.toString().toUpperCase()}
    </TextWrapper>
)

const BlackLabel = ({name='', subtitles=[], className, warning})=>(
    <BlackLabelWrapper className={className} warning={warning}>
        <Text bold>{name.toString().toUpperCase()}</Text>
        {subtitles.map((subtitle,key)=>(<Text key={key} small>
            {subtitle.toString().toUpperCase()}
        </Text>))}
    </BlackLabelWrapper>
)

const SidewaysBlackLabel = styled(BlackLabel)`
    height: 2em;
    flex-direction: row;
    justify-content: space-around;
    
`

const MissingItemWrapper = styled(TextInput)`
    ${underlined}
    background: #fff90033;
    font-size: 0.9em;
    cursor: pointer;
}`


function MissingItem ({ itemType, translate, rows=1 }) {
    const value = `${translate('your character needs a')} ${translate(itemType).toLowerCase()}.`
    return (<MissingItemWrapper
        disabled
        value={value}
        rows={rows}
    />)
}

const SelectedButton = styled.button`
  ${({selected})=> selected ? `
  background: #bbd9f3a3;
  ` : ''}
`

const ErrorTooltipWrapper = styled(Text)`
    color: #ff4444;
    font-size: 1.2em;
    text-align:center;
    &:hover { 
        color: inherit;
    }
`

const ErrorTooltip = ({message}) => (
    <ErrorTooltipWrapper bold data-tip={message}>
        Ø
    </ErrorTooltipWrapper>
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
    BlackLabel,
    Text,
    SquareButton,
    MissingItem,
    smallText,
    SidewaysBlackLabel,
    SelectedButton,
    ErrorTooltip
}