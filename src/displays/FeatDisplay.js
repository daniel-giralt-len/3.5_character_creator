import styled from 'styled-components'

const FeatLayout = styled.li`
    display: flex;
    justify-content: space-between;
    `
    
const FeatList = styled.ul`
    padding: 2px 4px;
    font-size: 0.9em;
`

function FeatItem({
    feat,
    onDelete,
}){
    return (
        <FeatLayout>
            <div>
                {feat.name}
            </div>
            <button onClick={() => onDelete(feat.id)}>
                -
            </button>
        </FeatLayout>
    )
}

function FeatDisplay({
    feats = {},
    dbs,
    translate,
    onFeatsChange
}) {
    if(Object.keys(feats).length === 0) return

    const handleDelete = id => onFeatsChange({...feats, [id]: false})

    return (
        <div>
            <h3>{translate('feats')}</h3>
            <FeatList>
                {Object.keys(feats)
                    .map((id) => (<FeatItem
                        key={id}
                        feat={dbs.feats.find(c=>id === c.id)}
                        onDelete={handleDelete}
                />))
                }
            </FeatList>
        </div>
    );
}

export default FeatDisplay;
