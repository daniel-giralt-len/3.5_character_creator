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
const smallText = `
font-size: 0.75em;
font-weight: 500;`

const boldText = `
font-weight: 900;
font-size: 1.3em;`

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

const TextWrapper = styled.div`
    ${({small}) => small ? smallText : ''}
    ${({bold}) => bold ? boldText : ''}
    ${({centered}) => centered ? fullCenteredText : ''}
    ${({box}) => box ? boxed : ''}
    ${({underline}) => underline ? underlined : ''}
`

const Text = ({children='', className, ...rest}) => (<TextWrapper
    className={className} 
    {...rest}
    >
        {children.toString().toUpperCase()}
    </TextWrapper>
)

const BlackLabel = ({name='', subtitle='', className})=>(
    <BlackLabelWrapper className={className}>
        <Text bold>{name.toString().toUpperCase()}</Text>
        {subtitle && (<Text small>{subtitle.toString().toUpperCase()}</Text>)}
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
    SelectedButton
}