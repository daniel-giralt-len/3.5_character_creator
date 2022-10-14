import styled from 'styled-components'
import skillTrickDb from "../db/json/itemData/skilltrickStats.json";
import { SquareButton, Text, SidewaysBlackLabel } from '../sharedComponents';

const SkillTricksLayout = styled.ul`
    grid-area: skilltricks;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-areas: 
        "header header header"
        "level name buttons";
    grid-template-columns: 1fr 4fr 1fr;
`

const SkillTrickItemLayout = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = styled(SidewaysBlackLabel)`grid-area: header;`
    
function SkillTrickItem({
    skillTrick,
    onDelete,
    errors,
    nLevel,
    selectedLevelIndex
}){
    const isSkillTrickSelected = nLevel === selectedLevelIndex
    return (
        <>
        <SkillTrickItemLayout>
            <Text warning={errors.unfullfilledPrerequisites.length > 0}>
                {isSkillTrickSelected ? `>${nLevel}<` : nLevel}
            </Text>
            </SkillTrickItemLayout>
            <SkillTrickItemLayout>
            <Text warning={errors.unfullfilledPrerequisites.length > 0}>
                {isSkillTrickSelected ? `>${skillTrick.name}` : skillTrick.name}
            </Text>
            </SkillTrickItemLayout>
            <div>
            {onDelete && isSkillTrickSelected && (<SquareButton onClick={() => onDelete(nLevel)}>
                -
            </SquareButton>)}
            </div>
        </>
    )
}

const renderSkillTricks = ({skillTricks, errors, handleDelete, selectedLevelIndex}) => {
    return skillTricks
            .map(({id, nLevel}) => {
                return (<SkillTrickItem
                    key={`${id}-${nLevel}`}
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
    errors,
    onSkillRemove,
    selectedLevelIndex,
    skillPointsUsed
}) {
    const handleDelete = nLevel => onSkillRemove(nLevel)

    return (
        <SkillTricksLayout>
            <Header
                name={translate('skilltricks')}
                subtitle={`${skillPointsUsed} ${translate('points')}`}
                warning={errors.isTotalOverBudget}
            />
            <Text small centered>{translate('level')}</Text>
            <Text small centered>{translate('class')}</Text>
            <Text small />
            {renderSkillTricks({skillTricks, handleDelete, errors: errors.singularErrors, selectedLevelIndex})}
        </SkillTricksLayout>
    );
}

export default SkillTricks;
