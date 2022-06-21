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

const Header = styled(SidewaysBlackLabel)`
    ${({warning}) => warning ? `
    color: #ff4444;
    font-weight: bold;
    ` : ''};
`
    
function LanguageItem({
    language,
    onDelete,
}){
    return (
        <LanguageLayout>
            <Text>
                {language.name}
            </Text>
            <SquareButton onClick={() => onDelete(language.id)}>
                -
            </SquareButton>
        </LanguageLayout>
    )
}

const renderLanguages = ({languages, handleDelete}) => {
    return Object
            .keys(languages)
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
}) {
    const handleDelete = id => onLanguagesChange({...languages, [id]: false})
    const areLanguagesOverBudget = usedLanguages>maxLanguages

    return (
        <LanguagesLayout warning={areLanguagesOverBudget}>
            <Header
                name={translate('languages')} subtitle={`${usedLanguages}/${maxLanguages}`}
                warning={areLanguagesOverBudget}
            />
            {renderLanguages({languages, handleDelete})}
        </LanguagesLayout>
    );
}

export default Languages;
