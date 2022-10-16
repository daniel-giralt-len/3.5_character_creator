import styled from 'styled-components'
import { Text, SidewaysBlackLabel } from '../sharedComponents';

const Header = styled(SidewaysBlackLabel)`grid-area: header;`

const FeatsLayout = styled.ul`
    grid-area: feats;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-areas: 
        "header header"
        "level name";
    grid-template-columns: 1fr 4fr;
`

function Feats({
    featSlots = [],
    totalSlots,
    translate,
    selectedLevelIndex,

}) {
    return (
        <FeatsLayout>
            <Header
                name={translate('feats')}
                subtitles={[`(${totalSlots})`]}
            />
            <Text small>{translate('level')}</Text>
            <Text small>{translate('name')}</Text>
            {featSlots.map(({level}) => (<>
                <Text info={selectedLevelIndex===level}>{level}</Text>
                <Text info={selectedLevelIndex===level}>—</Text>
            </>))}
        </FeatsLayout>
    );
}

export default Feats;
