import styled from 'styled-components'
import dbs from '../db/json/dbs.json'
import { BlackLabel, SquareButton, Text } from './sharedComponents';

const FeatsLayout = styled.ul`
    grid-area: feats;
    padding: 0;
    margin: 0;
`

const FeatLayout = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
    
function FeatItem({
    feat,
    onDelete,
}){
    return (
        <FeatLayout>
            <Text>
                {feat.name}
            </Text>
            <SquareButton onClick={() => onDelete(feat.id)}>
                -
            </SquareButton>
        </FeatLayout>
    )
}

function Feats({
    feats = {},
    translate,
    maxFeats,
    usedFeats,
    onFeatsChange,
}) {
    if(Object.keys(feats).length === 0) return

    const handleDelete = id => onFeatsChange({...feats, [id]: false})

    
    return (
        <FeatsLayout>
            <BlackLabel name={translate('feats')} />
            {Object.keys(feats)
                .map((id) => (<FeatItem
                    key={id}
                    feat={dbs.feats.find(c=>id === c.id)}
                    onDelete={handleDelete}
            />))}
        </FeatsLayout>
    );
}

export default Feats;
