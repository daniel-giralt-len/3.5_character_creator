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
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
            <TextInput rows={3} disabled value={accClassListString} />
            <SmallText>{translate('classes')}</SmallText>
        </ClassNamesLayout>
    )
}

export default ClassNames;