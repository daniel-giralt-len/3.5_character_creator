import styled from 'styled-components'
import findInDb from "../functions/findInDb";
import { SquareButton, Text, SidewaysBlackLabel } from '../sharedComponents';

const LanguagesLayout = styled.ul`
    grid-area: languages;
    padding: 0;
    margin: 0;
    ${({warning}) => warning ? `
    background: #ff000033;
    ` : ''};
`

const LanguageLayout = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Header = SidewaysBlackLabel
    
function LanguageItem({
    language,
    onDelete,
}){
    return (
        <LanguageLayout>
            <Text>
                {language.name}
            </Text>
            {onDelete && (<SquareButton onClick={() => onDelete(language.id)}>
                -
            </SquareButton>)}
        </LanguageLayout>
    )
}

const renderLanguages = ({languages, handleDelete}) => {
    return languages
            .map((id) => {
                return (<LanguageItem
                    key={id}
                    language={findInDb('language', id)}
                    onDelete={handleDelete}
                />)
            })
}

function Languages({
    languages = {},
    translate,
    maxLanguages,
    usedLanguages,
    onLanguagesChange,
    automaticLanguages,
    errors
}) {
    const handleDelete = id => onLanguagesChange({...languages, [id]: false})
    const selectedLanguages = Object.entries(languages).filter(([k,v])=>v).map(([k])=>k)

    return (
        <LanguagesLayout warning={errors.overBudget}>
            <Header
                name={translate('language')}
                subtitles={[
                    `${usedLanguages}/${maxLanguages}`,
                    automaticLanguages.length > 0 && `(+${automaticLanguages.length} ${translate('racials')})`
                ].filter(v=>v)}
                warning={errors.overBudget}
            />
            {renderLanguages({languages: automaticLanguages})}
            {renderLanguages({languages: selectedLanguages, handleDelete})}
        </LanguagesLayout>
    );
}

export default Languages;
