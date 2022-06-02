import styled from 'styled-components'

import { 
    TextInput,
    Text,
} from './sharedComponents';

const NameLayout = styled.div`
    grid-area: name;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

function Name({
    name,
    translate,
    onNameChange
}){
    
    return(
        <NameLayout>
            <TextInput onChange={e => onNameChange(e.target.value)} value={name} rows={1} />
            <Text small>{translate('character name')}</Text>
        </NameLayout>
    )
}

export default Name;