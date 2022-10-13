import styled from 'styled-components'
import skillTrickDb from "../db/json/itemData/skilltrickStats.json";
import { SquareButton, Text, SidewaysBlackLabel } from '../sharedComponents';

const SkillTricksLayout = styled.ul`
    grid-area: skilltricks;
    padding: 0;
    margin: 0;
    ${({warning}) => warning ? `
    background: #ff000033;
    ` : ''};
`

const SkillTrickLayout = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Header = SidewaysBlackLabel
    
function SkillTrickItem({
    skillTrick,
    onDelete,
    errors,
    nLevel,
    selectedLevelIndex
}){
    return (
        <SkillTrickLayout>
            <Text warning={errors.unfullfilledPrerequisites.length > 0}>
                {nLevel}
            </Text>
            <Text warning={errors.unfullfilledPrerequisites.length > 0}>
                {skillTrick.name}
            </Text>
            {onDelete && nLevel === selectedLevelIndex && (<SquareButton onClick={() => onDelete(nLevel)}>
                -
            </SquareButton>)}
        </SkillTrickLayout>
    )
}

const renderSkillTricks = ({skillTricks, errors, handleDelete, selectedLevelIndex}) => {
    return skillTricks
            .map(({id, nLevel}) => {
                return (<SkillTrickItem
                    key={id}
                    skillTrick={skillTrickDb[id]}
                    nLevel={nLevel}
                    onDelete={handleDelete}
                    errors={errors[id]}
                    selectedLevelIndex={selectedLevelIndex}
                />)
            })
}

function SkillTricks({
    skillTricks = [],
    translate,
    maxSkillTricks,
    usedSkillTricks,
    usedSkillPoints,
    onLanguagesChange,
    automaticLanguages,
    errors,
    onSkillRemove,
    selectedLevelIndex
}) {
    const handleDelete = nLevel => onSkillRemove(nLevel)
    //const areLanguagesOverBudget = usedLanguages>maxLanguages

    return (
        <SkillTricksLayout>
            <Header
                name={translate('skilltricks')}
                //warning={areLanguagesOverBudget}
            />
            {renderSkillTricks({skillTricks, handleDelete, errors, selectedLevelIndex})}
        </SkillTricksLayout>
    );
}

export default SkillTricks;
