import styled from 'styled-components'
import skillTrickDb from "../db/json/itemData/skilltrickStats.json";
import prerequisiteToString from '../functions/prerequisiteToString';
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
    justify-content: space-evenly;
    align-items: center;
`

const Header = styled(SidewaysBlackLabel)`grid-area: header;`
    
function SkillTrickItem({
    skillTrick,
    onDelete,
    errors,
    nLevel,
    translate,
    selectedLevelIndex
}){
    const hasErrors = errors.unfullfilledPrerequisites.length > 0
    const isSkillTrickSelected = nLevel === selectedLevelIndex

    const PrerequisitesErrorMessage = hasErrors && (<ErrorTooltip 
        message={`${translate('requisites not met')}:<br/>${errors.unfullfilledPrerequisites.map(p=>`- ${prerequisiteToString(p,translate)}`).join('<br/>')}`}
    />)

    return (
        <>
        <SkillTrickItemLayout>
            <Text
                warning={hasErrors}
                info={selectedLevelIndex === nLevel}
            >
                {isSkillTrickSelected ? `>${nLevel}<` : nLevel}
            </Text>
            </SkillTrickItemLayout>
            <SkillTrickItemLayout>
                <Text
                    warning={hasErrors}
                    info={selectedLevelIndex === nLevel}
                >
                    {isSkillTrickSelected ? `>${skillTrick.name}` : skillTrick.name}
                </Text>
                {PrerequisitesErrorMessage}
            </SkillTrickItemLayout>
            <div>
                {onDelete && isSkillTrickSelected && (<SquareButton onClick={() => onDelete(nLevel)}>
                    -
                </SquareButton>)}
            </div>
        </>
    )
}

const renderSkillTricks = ({skillTricks, errors, handleDelete, selectedLevelIndex, translate}) => {
    return skillTricks
            .map(({id, nLevel}) => {
                return (<SkillTrickItem
                    key={`${id}-${nLevel}`}
                    skillTrick={skillTrickDb[id]}
                    nLevel={nLevel}
                    onDelete={handleDelete}
                    errors={errors[id]}
                    selectedLevelIndex={selectedLevelIndex}
                    translate={translate}
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
            {renderSkillTricks({skillTricks, handleDelete, errors: errors.singularErrors, selectedLevelIndex, translate})}
        </SkillTricksLayout>
    );
}

export default SkillTricks;
