import webTranslations from './db/json/translations/webTranslations.json'
import { SelectedButton } from './styles'
import SelectorSwitch from './SelectorSwitch'

import styled from 'styled-components'

const HeaderWrapper = styled.header`
    grid-area: header;
    margin-bottom: 15px;
`

const SelectorSwitchWrapper = styled.header`
    grid-area: header-selector;
`

function Header({
    handleChangeTranslations,
    translate,
    selectedLanguage,
    isSelectorOpen,
    onSelectorSwitch
}){
    const languages = Object.keys(webTranslations).filter(v => v !== '*')

    return (
        <>
            <HeaderWrapper>
                {languages.map(key => (
                    <SelectedButton
                        key={key}
                        selected={key===selectedLanguage}
                        onClick={() => handleChangeTranslations(key)}
                    >
                        {translate(key)}
                    </SelectedButton>
                ))}
            </HeaderWrapper>
            <SelectorSwitchWrapper>
                <SelectorSwitch
                    isSelectorOpen={isSelectorOpen}
                    onSelectorSwitch={onSelectorSwitch}
                />
            </SelectorSwitchWrapper>
        </>
    )
}

export default Header;