import webTranslations from './db/json/translations/webTranslations.json'
import { SelectedButton } from './styles'

import styled from 'styled-components'

const HeaderWrapper = styled.header`
    grid-area: header;
    margin-bottom: 15px;
`

function Header({
    handleChangeTranslations,
    translate,
    selectedLanguage,
}){
    const languages = Object.keys(webTranslations).filter(v => v !== '*')

    return (
        <HeaderWrapper>
            <div>
                {languages.map(key => (
                    <SelectedButton
                        key={key}
                        selected={key===selectedLanguage}
                        onClick={() => handleChangeTranslations(key)}
                    >
                        {translate(key)}
                    </SelectedButton>
                ))}
            </div>
        </HeaderWrapper>
    )
}

export default Header;