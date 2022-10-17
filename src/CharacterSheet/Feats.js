import styled from 'styled-components'
import { Text, SidewaysBlackLabel, SquareButton, ErrorTooltip } from '../sharedComponents';
import { Fragment } from 'react';
import featStats from '../db/json/itemData/featStats.json'
import prerequisiteToString from '../functions/prerequisiteToString';

const Header = styled(SidewaysBlackLabel)`grid-area: header;`

const FeatsLayout = styled.ul`
    grid-area: feats;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-areas: 
        "header header header"
        "level name buttons";
    grid-template-columns: 1fr 4fr 1fr;
`

const FeatCellLayout = styled.li`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`


function Feats({
    featSlots = [],
    totalSlots,
    translate,
    selectedLevelIndex,
    onFeatsChange,
    errors,
}) {
    const onRemoveFeat = removedId => {
        const newLevelSlots = featSlots
            .filter(({level})=> selectedLevelIndex===level)
            .filter(({id})=>id!==removedId)
            .map(({id})=>id)
            .filter(v=>v)
        onFeatsChange(newLevelSlots)
    }
    return (
        <FeatsLayout>
            <Header
                name={translate('feats')}
                subtitles={[`${totalSlots.current} (${totalSlots.added})`]}
            />
            <Text small>{translate('level')}</Text>
            <Text small>{translate('name')}</Text>
            <Text small />
            {featSlots.map(({level, id}, i) => {

                const isFeatOfselectedLevel = selectedLevelIndex===level
                const hasErrors = errors[i].length > 0
                
                const ErrorComponent = hasErrors && (<ErrorTooltip
                    message={`${translate('requisites not met')}:<br/>${errors[i].map(p=>`- ${prerequisiteToString(p,translate)}`).join('<br/>')}`}
                />)
                
                return(<Fragment key={i}>
                    <FeatCellLayout><Text warning={hasErrors} info={isFeatOfselectedLevel}>{level}</Text></FeatCellLayout>
                    <FeatCellLayout>
                        <Text warning={hasErrors} info={isFeatOfselectedLevel}>
                            {featStats[id] ? translate((featStats[id]||{}).name||'', 'feats') : '—'}
                        </Text>
                        {ErrorComponent}
                    </FeatCellLayout>
                    <FeatCellLayout>
                        {isFeatOfselectedLevel && (<SquareButton onClick={() => onRemoveFeat(id)}>
                            -
                        </SquareButton>)}
                    </FeatCellLayout>
                </Fragment>)
            })}
        </FeatsLayout>
    );
}

export default Feats;
