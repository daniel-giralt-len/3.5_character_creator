import styled from 'styled-components'
import classStats from '../db/json/itemData/classStats.json'
import dbs from '../db/json/dbs.json'
import { Text, BlackLabel, noPrintStyle } from '../sharedComponents';
import ClassDetailItem from './ClassDetailItem';

const Header = styled(BlackLabel)`grid-area: header`

const ClassesLayout = styled.li`
    grid-area: classes;
    display: grid;
    grid-template-areas: 
        "header header header"
        "level name buttons";
    grid-template-columns: 1fr 4fr 3fr;
    ${noPrintStyle}
`

function ClassesDisplay({
    classes = [],
    translate,
    handleClassChange,
    handleClassDuplication,
    onSelectedLevelChange,
    selectedLevelIndex,
    errors
}) {
    const indices = Array(classes.length).fill().map((_,i)=>i)
    const handleReorder = (position, direction) => {
        const d = direction === 'up' ? -1 : +1
        const out = [...indices]
        const c = out[position]
        out[position] = out[position+d]
        out[position+d] = c
        handleClassChange(out)
    }
    const handleDelete = position => {
        const out = [...indices]
        out.splice(position,1)
        handleClassChange(out)
    }

    const canDuplicate = classes.length < 20

    return (
        <ClassesLayout>
            <Header name={translate('classes')} />
            <Text small centered>{translate('level')}</Text>
            <Text small centered>{translate('class')}</Text>
            <Text small />
            <ClassDetailItem 
                position={0}
                classData={{name: translate('base level')}}
                onSelectedLevelChange={()=>onSelectedLevelChange(0)}
                isSelected={selectedLevelIndex === 0}
                canDuplicate={false}
            />
            {classes
                .map((id,i) => (<ClassDetailItem
                    key={`${i+1}-${id}`}
                    position={i+1}
                    classData={dbs.classes.find(c=>id === c.id)}
                    onReorder={handleReorder}
                    onDuplication={handleClassDuplication}
                    onDelete={handleDelete}
                    onSelectedLevelChange={()=>onSelectedLevelChange(i+1)}
                    isSelected={selectedLevelIndex === i+1}
                    canDuplicate={canDuplicate}
                    isFirstLevel={i === 0}
                    isLastLevel={i === classes.length - 1}
                    errors={errors[i+1]}
            />))
            }
        </ClassesLayout>
    );
}

export default ClassesDisplay;
