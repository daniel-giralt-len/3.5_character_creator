import styled from 'styled-components'
import classStats from '../db/json/itemData/classStats.json'
import dbs from '../db/json/dbs.json'
import { Text, BlackLabel } from '../sharedComponents';
import ClassDetailItem from './ClassDetailItem';

const Header = styled(BlackLabel)`grid-area: header`

const ClassesLayout = styled.li`
    grid-area: classes;
    display: grid;
    grid-template-areas: 
        "header header header"
        "level name buttons";
    grid-template-columns: 1fr 4fr 3fr;
`

function ClassesDisplay({
    classes = [],
    translate,
    handleClassChange
}) {
    if(classes.length === 0) return (<ClassesLayout> <Header name={translate('classes')} /> </ClassesLayout>)

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
            <Header name={translate('classes')} />
            <Text small centered>{translate('level')}</Text>
            <Text small centered>{translate('class')}</Text>
            <Text small />
            {classes
                .map((id,i) => (<ClassDetailItem
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

export default ClassesDisplay;
