import styled from 'styled-components'

const SelectorSwitchLayout = styled.div`
    ${({isSelectorOpen}) => isSelectorOpen
        ? ''
        : `display: flex;
        justify-content: flex-end;`}
`

const SelectorSwitch = ({
    isSelectorOpen,
    onSelectorSwitch
}) => (<SelectorSwitchLayout isSelectorOpen={isSelectorOpen}>
    <button onClick={onSelectorSwitch}>
        {isSelectorOpen ? '>>' : '<<'}
    </button>
    </SelectorSwitchLayout>
)

export default SelectorSwitch