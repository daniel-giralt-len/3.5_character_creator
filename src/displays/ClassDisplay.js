import styled from 'styled-components'
import classStats from '../db/json/itemData/classStats.json'

const ClassLayout = styled.li`
    
`

function ClassLevel({
    level,
    classData,
    classStats
}){
    const {name} = classData
    return (
        <ClassLayout>
            {level}:{name}
            {JSON.stringify(classStats['skill points'])}
        </ClassLayout>
    )
}

function ClassDisplay({
    classes = [],
    dbs,
    translate,
    handleClassChange
}) {

    return (
        <div>
            <h3>{translate('classes')}</h3>
            <ul>
                {classes
                    .map((id2,i) => (<ClassLevel
                        key={`${i+1}-${id2}`}
                        level={i+1}
                        classData={dbs.classes.find(({id})=>id2===id)}
                        classStats={classStats[id2]}
                />))
                }
            </ul>
        </div>
    );
}

export default ClassDisplay;
