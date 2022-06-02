import webTranslations from './translations/webTranslations.json'
import { SelectedButton } from './styles'

import styled from 'styled-components'

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
            <div/>
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