import styled from 'styled-components'
import raceStats from '../db/json/itemData/raceStats.json'
import calculateCharacterBonuses from "../functions/calculateCharacterBonuses";

import {
    CounterInput,
    BoldText,
    SmallText,
    BlackLabel,
} from './sharedComponents'


const ScoresLayout = styled.ul`
    grid-area: scores;
    display: grid;
    grid-template-columns: 110px 50px 75px 50px;
    grid-row-gap: 5px;
    grid-column-gap: 5px;
    text-align: center;

    padding: 0;
    margin: 0;

    * {
        display:flex;
        align-items: center;
        justify-content: center;
    }

`

function Scores({
        character,
        translate,
        onScoreChange
    }){
        const {
            scores,
            races,
            classes
        } = character

        const raceData = raceStats[races]
        const bonuses = calculateCharacterBonuses({raceData, classes})    

        return(
                <ScoresLayout>
                    <SmallText>{translate('name').toUpperCase()}</SmallText>
                    <SmallText>{translate('total').toUpperCase()}</SmallText>
                    <SmallText>{translate('base').toUpperCase()}</SmallText>
                    <SmallText>{translate('race').toUpperCase()}</SmallText>
                    {Object
                        .entries(scores)
                        .map(([id, value]) => (
                            <>
                                <BlackLabel
                                    name={translate(id).toUpperCase()}
                                    subtitle={translate(`${id}_long`).toUpperCase()}
                                />
                                <BoldText>
                                    {value+bonuses[id]}
                                </BoldText>
                                <CounterInput 
                                    type="number"
                                    step="1"
                                    value={value}
                                    name={id}
                                    id={id}
                                    max={50}
                                    min={0}
                                    onChange={e => onScoreChange(id, e.target.value)}
                                />
                                <span>
                                    {bonuses[id]}
                                </span>
                            </>
                        ))
                    }
                </ScoresLayout>
        )
}

export default Scores