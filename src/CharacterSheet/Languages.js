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
}) {
    const handleDelete = id => onLanguagesChange({...languages, [id]: false})
    const areLanguagesOverBudget = usedLanguages>maxLanguages
    const selectedLanguages = Object.entries(languages).filter(([k,v])=>v).map(([k])=>k)

    return (
        <LanguagesLayout warning={areLanguagesOverBudget}>
            <Header
                name={translate('language')} subtitle={`${usedLanguages}/${maxLanguages}`}
                warning={areLanguagesOverBudget}
            />
            {renderLanguages({languages: automaticLanguages})}
            {renderLanguages({languages: selectedLanguages, handleDelete})}
        </LanguagesLayout>
    );
}

export default Languages;
