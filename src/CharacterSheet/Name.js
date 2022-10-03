import styled from 'styled-components'

import { 
    TextInput,
    Text,
} from '../sharedComponents';

const NameLayout = styled.div`
    grid-area: name;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

function Name({
    disabled,
    name,
    translate,
    onNameChange,
}){
    
    return(
        <NameLayout>
            <TextInput
                disabled={disabled}
                onChange={e => onNameChange(e.target.value)}
                rows={1}
                value={name}
            />
            <Text small>{translate('character name')}</Text>
        </NameLayout>
    )
}

export default Name;