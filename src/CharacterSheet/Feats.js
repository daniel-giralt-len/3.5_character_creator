import styled from 'styled-components'
import findInDb from "../functions/findInDb";
import { SquareButton, Text, SidewaysBlackLabel } from '../sharedComponents';

const FeatsLayout = styled.ul`
    grid-area: feats;
    padding: 0;
    margin: 0;
    ${({warning}) => warning ? `
    background: #ff000033;
    ` : ''};
`

const FeatLayout = styled.li`
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

const renderFeats = ({feats, handleDelete}) => {
    return Object
            .keys(feats)
            .map((id) => {
                return (<FeatItem
                    key={id}
                    feat={findInDb('feats', id)}
                    onDelete={handleDelete}
                />)
            })
}

function Feats({
    feats = {},
    translate,
    maxFeats,
    usedFeats,
    onFeatsChange,
}) {
    const handleDelete = id => onFeatsChange({...feats, [id]: false})
    const areFeatsOverBudget = usedFeats>maxFeats

    return (
        <FeatsLayout warning={areFeatsOverBudget}>
            <Header
                name={translate('feats')}
                subtitles={[`${usedFeats}/${maxFeats}`]}
                warning={areFeatsOverBudget}
            />
            {renderFeats({feats, handleDelete})}
        </FeatsLayout>
    );
}

export default Feats;
