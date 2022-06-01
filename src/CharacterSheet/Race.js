import styled from 'styled-components'

import { 
    TextInput,
    SmallText,
} from './sharedComponents';

const RaceLayout = styled.div`
    grid-area: race;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

function Race({
    race,
    translate,
}){
    
    return(
        <RaceLayout>
            <TextInput disabled value={race} rows={1} />
            <SmallText>{translate('race')}</SmallText>
        </RaceLayout>
    )
}

export default Race;