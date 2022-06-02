import styled from 'styled-components'
import { MissingItem } from './sharedComponents';

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
    raceName,
    translate,
}){
    
    return(
        <RaceLayout>
            {raceName 
                ? (<TextInput disabled value={raceName} rows={1} />)
                : (<MissingItem
                    translate={translate}
                    itemType='race'
                />)
            }
            
            <SmallText>{translate('race')}</SmallText>
        </RaceLayout>
    )
}

export default Race;