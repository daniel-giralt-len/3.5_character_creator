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
}){
    return (
        <SkillTrickLayout>
            <Text>
                {skillTrick.name}
            </Text>
            {onDelete && (<SquareButton onClick={() => onDelete(skillTrick.id)}>
                -
            </SquareButton>)}
        </SkillTrickLayout>
    )
}

const renderSkillTricks = ({skillTricks, handleDelete}) => {
    return skillTricks
            .map((id) => {
                return (<SkillTrickItem
                    key={id}
                    skillTrick={skillTrickDb[id]}
                    onDelete={handleDelete}
                />)
            })
}

function SkillTricks({
    skillTricks = {},
    translate,
    maxSkillTricks,
    usedSkillTricks,
    usedSkillPoints,
    onLanguagesChange,
    automaticLanguages,
}) {
    //const handleDelete = id => onLanguagesChange({...languages, [id]: false})
    //const areLanguagesOverBudget = usedLanguages>maxLanguages
    const selectedSkillTricks = Object.values(skillTricks).map(k=>k)

    return (
        <SkillTricksLayout>
            <Header
                name={translate('skilltricks')}
                //warning={areLanguagesOverBudget}
            />
            {renderSkillTricks({skillTricks: selectedSkillTricks})}
        </SkillTricksLayout>
    );
}

export default SkillTricks;
