import styled from 'styled-components'

import { 
    TextInput,
    SmallText,
} from './sharedComponents';

const NameLayout = styled.div`
    grid-area: name;
`

function Name({
    name,
    translate,
    onNameChange
}){
    
    return(
        <NameLayout>
            <TextInput onChange={e => onNameChange(e.target.value)} rows={1}>{name}</TextInput>
            <SmallText>{translate('character name')}</SmallText>
        </NameLayout>
    )
}

export default Name;