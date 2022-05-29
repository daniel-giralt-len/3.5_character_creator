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
    handleCreationSwitch,
    handleChangeTranslations,
    translate,
    selectedLanguage,
    isCorpus
}){
    const languages = Object.keys(webTranslations).filter(v => v !== '*')

    return (
        <HeaderWrapper>
            <div>
                <span>{isCorpus 
                    ? translate('creating a corpus') 
                    : translate('creating a character')}
                </span>
                <button onClick = {handleCreationSwitch}>
                    {translate('switch')}
                </button>
            </div>
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