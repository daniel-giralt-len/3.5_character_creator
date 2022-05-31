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
            <TextInput onChange={e => onNameChange(e.target.value)} value={name} rows={1} />
            <SmallText>{translate('character name')}</SmallText>
        </NameLayout>
    )
}

export default Name;