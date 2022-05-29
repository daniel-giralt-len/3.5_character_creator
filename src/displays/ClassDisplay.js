import styled from 'styled-components'
import classStats from '../db/json/itemData/classStats.json'

const ClassLayout = styled.li`
    display: flex;
    justify-content: space-between;
`

function ClassLevel({
    position,
    classData,
    classStats,
    onReorder,
    onDuplication,
    onDelete,
    isLevel20
}){
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
                <button onClick={() => onReorder(position, 'up')}>^</button>
                <button onClick={() => onReorder(position, 'down')}>v</button>
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
    const isLevel20 = classes.length === 20
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
            <h3>{translate('classes')}</h3>
            <ul>
                {classes
                    .map((id2,i) => (<ClassLevel
                        key={`${i+1}-${id2}`}
                        position={i}
                        classData={dbs.classes.find(({id})=>id2===id)}
                        classStats={classStats[id2]}
                        onReorder={handleReorder}
                        onDuplication={handleDuplication}
                        onDelete={handleDelete}
                        isLevel20={isLevel20}
                />))
                }
            </ul>
        </div>
    );
}

export default ClassDisplay;
