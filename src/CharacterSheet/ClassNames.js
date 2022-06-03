import styled from 'styled-components'
import groupClassesByLevels from "../functions/groupClassesByLevels";
import findInDb from '../functions/findInDb';

import { 
    TextInput,
    MissingItem,
    Text
} from '../sharedComponents';

const ClassNamesLayout = styled.div`
    grid-area: class-names;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

function ClassNames({
        classes,
        translate,
        onChangeSelectorTab
    }){
    const onOpenClassesSelectors = () => onChangeSelectorTab('classes')

    const accClassListString = groupClassesByLevels(classes)
        .map(({id, ...rest}) => ({id, ...rest, ...findInDb('classes', id)}))
        .reduce((acc,{name, count})=>([...acc,`${name} ${count}`]),[])
        .join('/')
    
    return(
        <ClassNamesLayout onClick={onOpenClassesSelectors}>
            {classes.length === 0
                ? (<MissingItem translate={translate} itemType='class'/>)
                : (<TextInput rows={3} disabled value={accClassListString}/>)
            }
            <Text small>{translate('classes')}</Text>
        </ClassNamesLayout>
    )
}

export default ClassNames;