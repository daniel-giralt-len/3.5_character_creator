import styled from 'styled-components'
import { Text, SidewaysBlackLabel, SquareButton } from '../sharedComponents';
import { Fragment } from 'react';
import featStats from '../db/json/itemData/featStats.json'

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

function Feats({
    featSlots = [],
    totalSlots,
    translate,
    selectedLevelIndex,
    onFeatsChange
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
            {featSlots.map(({level, id}, i) => (<Fragment key={i}>
                <Text info={selectedLevelIndex===level}>{level}</Text>
                <Text info={selectedLevelIndex===level}>
                    {featStats[id] ? translate((featStats[id]||{}).name||'', 'feats') : '—'}
                </Text>
                <div>
                    {selectedLevelIndex===level && (<SquareButton onClick={() => onRemoveFeat(id)}>
                        -
                    </SquareButton>)}
                </div>
            </Fragment>))}
        </FeatsLayout>
    );
}

export default Feats;
