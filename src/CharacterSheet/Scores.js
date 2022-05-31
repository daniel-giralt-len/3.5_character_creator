import styled from 'styled-components'

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

    padding: 0;
    margin: 0;

    * {
        display:flex;
        align-items: center;
        justify-content: center;
    }
`

function Scores({
        scores,
        bonuses,
        translate,
        onScoreChange
    }){
        return(
                <ScoresLayout>
                    <SmallText>{translate('name')}</SmallText>
                    <SmallText>{translate('total')}</SmallText>
                    <SmallText>{translate('base')}</SmallText>
                    <SmallText>{translate('race')}</SmallText>
                    {Object
                        .entries(scores)
                        .map(([id, value]) => (
                            <>
                                <BlackLabel
                                    name={translate(id)}
                                    subtitle={translate(`${id}_long`)}
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