import styled from 'styled-components'
import classStats from '../db/json/itemData/classStats.json'
import MissingItem from "../items/MissingItem";

const ClassLayout = styled.li`
    display: flex;
    justify-content: space-between;
`

function ClassLevel({
    position,
    classData,
    onReorder,
    onDuplication,
    onDelete,
    nLevels,
}){
    const isLevel20 = nLevels === 20
    const {name} = classData
    const level = position+1
    return (
        <ClassLayout>
            <div>
                {level}:{name}
            </div>
            <div>
                {!isLevel20 && <button onClick={() => onDuplication(position)}>D</button>}
                <button onClick={() => onDelete(position)}>-</button>
                <button onClick={() => onReorder(position, 'up')} disabled={position === 0}>^</button>
                <button onClick={() => onReorder(position, 'down')} disabled={position === (nLevels-1)}>v</button>
            </div>
        </ClassLayout>
    )
}

function ClassDisplay({
    classes = [],
    dbs,
    translate,
    handleClassChange
}) {
    if(classes.length === 0) {
        return (<MissingItem
            translate={translate}
            itemType='class'
        />)
    }

    const handleReorder = (position, direction) => {
        const d = direction === 'up' ? -1 : +1
        const out = [...classes]
        const c = out[position]
        out[position] = out[position+d]
        out[position+d] = c
        handleClassChange(out)
    }
    const handleDuplication = position => {
        const out = [...classes]
        out.splice(position,0,out[position])
        handleClassChange(out)
    }
    const handleDelete = position => handleClassChange(classes.filter((_,i)=>i!==position))

    return (
        <div>
            <h3>{translate('levels')}</h3>
            <ul>
                {classes
                    .map((id,i) => (<ClassLevel
                        key={`${i+1}-${id}`}
                        position={i}
                        classData={dbs.classes.find(c=>id === c.id)}
                        classStats={classStats[id]}
                        onReorder={handleReorder}
                        onDuplication={handleDuplication}
                        onDelete={handleDelete}
                        nLevels={classes.length}
                />))
                }
            </ul>
        </div>
    );
}

export default ClassDisplay;
