import styled from 'styled-components'

import findInDb from "../functions/findInDb";
import MissingItem from "../items/MissingItem";

const RaceLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

function RaceDisplay({
    id,
    dbs,
    translate
}){
    if(!id) {
        return (<MissingItem
            translate={translate}
            itemType='race'
        />)
    }

    const raceData = findInDb(dbs, 'races', id) || {}
    return (
        <RaceLayout>
            <h3>
                {translate('race')}:
            </h3>
            <div>
               {raceData.name}
            </div>
        </RaceLayout>
    )
}

export default RaceDisplay;
