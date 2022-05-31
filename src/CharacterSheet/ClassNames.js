import styled from 'styled-components'
import groupClassesByLevels from "../functions/groupClassesByLevels";
import findInDb from '../functions/findInDb';
import dbs from '../db/json/dbs.json'

import { 
    TextInput,
    SmallText,
} from './sharedComponents';

const ClassNamesLayout = styled.div`
    grid-area: class-names;
`

function ClassNames({
        classes,
        translate
    }){
    const accClassListString = groupClassesByLevels(classes)
        .map(({id, ...rest}) => ({id, ...rest, ...findInDb(dbs, 'classes', id)}))
        .reduce((acc,{name, count})=>([...acc,`${name} ${count}`]),[])
        .join('/')
    
    return(
        <ClassNamesLayout>
            <TextInput rows={1} disabled value={accClassListString} />
        </ClassNamesLayout>
    )
}

export default ClassNames;