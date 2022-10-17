import webTranslations from './db/json/translations/webTranslations.json'
import { SelectedButton } from './sharedComponents'
import SelectorSwitch from './SelectorSwitch'
import { noPrintStyle } from './sharedComponents'

import styled from 'styled-components'

const HeaderWrapper = styled.header`
    grid-area: header;
    margin-bottom: 15px;
    ${noPrintStyle}
`

const SelectorSwitchWrapper = styled.header`
    grid-area: header-selector;
    ${noPrintStyle}
`

function Header({
    handleChangeTranslations,
    translate,
    selectedLanguage,
    isSelectorOpen,
    onSelectorSwitch,
    hideSelectorSwitch
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
            {!hideSelectorSwitch &&
                <SelectorSwitchWrapper>
                    <SelectorSwitch
                        isSelectorOpen={isSelectorOpen}
                        onSelectorSwitch={onSelectorSwitch}
                    />
                </SelectorSwitchWrapper>
            }
        </>
    )
}

export default Header;