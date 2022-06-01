import styled from 'styled-components'
import classStats from '../db/json/itemData/classStats.json'
import MissingItem from "../items/MissingItem";
import dbs from '../db/json/dbs.json'
import { SmallText } from './sharedComponents';
import { boxed } from './sharedComponents';

const ClassesLayout = styled.li`
    grid-area: classes;
    display: grid;
    grid-template-areas: "level name buttons";
    grid-template-columns: 1fr 4fr 3fr;
`

const ButtonWrapper = styled.button`${boxed}`

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
        <>
            <div>{level}</div>
            <div>{name}</div>
            <div>
                {!isLevel20 && <ButtonWrapper onClick={() => onDuplication(position)}>D</ButtonWrapper>}
                <ButtonWrapper onClick={() => onDelete(position)}>-</ButtonWrapper>
                <ButtonWrapper onClick={() => onReorder(position, 'up')} disabled={position === 0}>^</ButtonWrapper>
                <ButtonWrapper onClick={() => onReorder(position, 'down')} disabled={position === (nLevels-1)}>v</ButtonWrapper>
            </div>
        </>
    )
}

function ClassDisplay({
    classes = [],
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
        <ClassesLayout>
            <SmallText>{translate('level')}</SmallText>
            <SmallText>{translate('class')}</SmallText>
            <SmallText />
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
        </ClassesLayout>
    );
}

export default ClassDisplay;
