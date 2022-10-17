import styled from 'styled-components'
import skillTrickDb from "../db/json/itemData/skilltrickStats.json";
import { SquareButton, Text, SidewaysBlackLabel, ErrorTooltip } from '../sharedComponents';

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
            <Text
                warning={errors.unfullfilledPrerequisites.length > 0}
                info={selectedLevelIndex === nLevel}
            >
                {isSkillTrickSelected ? `>${nLevel}<` : nLevel}
            </Text>
            </SkillTrickItemLayout>
            <SkillTrickItemLayout>
            <Text
                warning={errors.unfullfilledPrerequisites.length > 0}
                info={selectedLevelIndex === nLevel}
            >
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

const OverallErrorMessage = errors.isTotalOverBudget && (<ErrorTooltip 
        message={translate('error skill tricks total over budget', undefined, {
            selected: skillTricks.length,
            available: Math.ceil(selectedLevelIndex/2)
        })}
    />)

    return (
        <SkillTricksLayout>
            <Header
                name={translate('skilltricks')}
                subtitles={[`${skillPointsUsed.current} ${translate('points')} (${skillPointsUsed.added})`]}
                warning={errors.isTotalOverBudget}
            >
                {OverallErrorMessage}
            </Header>
            <Text small centered>{translate('level')}</Text>
            <Text small centered>{translate('class')}</Text>
            <Text small />
            {renderSkillTricks({skillTricks, handleDelete, errors: errors.singularErrors, selectedLevelIndex})}
        </SkillTricksLayout>
    );
}

export default SkillTricks;
