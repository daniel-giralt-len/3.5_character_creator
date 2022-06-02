import styled from 'styled-components'
import { MissingItem } from './sharedComponents';

import { 
    TextInput,
    Text
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
    onChangeSelectorTab
}){
    const onOpenRacesSelectors = () => onChangeSelectorTab('races')
    return(
        <RaceLayout onClick={onOpenRacesSelectors}>
            {raceName 
                ? (<TextInput disabled value={raceName} rows={1}/>)
                : (<MissingItem
                    translate={translate}
                    itemType='race'
                />)
            }
            
            <Text small>{translate('race')}</Text>
        </RaceLayout>
    )
}

export default Race;