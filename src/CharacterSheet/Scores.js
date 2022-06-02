import styled from 'styled-components'
import { Fragment } from 'react'

import {
    CounterInput,
    BoldText,
    SmallText,
    BlackLabel,
} from './sharedComponents'

const ScoresLayout = styled.ul`
    grid-area: scores;

    display: grid;
    grid-template-columns: 2.2fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 5px;
    grid-column-gap: 5px;

    padding: 0;
    margin: 0;

    * {
        display:flex;
        align-items: center;
        justify-content: center;
        max-height: 40px;
    }
`

function Scores({
        scores,
        bonuses,
        translate,
        onScoreChange,
        modifiers
    }){
        return(
                <ScoresLayout>
                    <SmallText>{translate('name')}</SmallText>
                    <SmallText>{translate('mod')}</SmallText>
                    <SmallText>{translate('total')}</SmallText>
                    <SmallText>{translate('base')}</SmallText>
                    <SmallText>{translate('race')}</SmallText>
                    {Object
                        .entries(scores)
                        .map(([id, value]) => (
                            <Fragment key={id}>
                                <BlackLabel
                                    name={translate(id)}
                                    subtitle={translate(`${id}_long`)}
                                />
                                <div >
                                    {modifiers[id]}
                                </div>
                                <BoldText box>
                                    {value+bonuses[id]}
                                </BoldText>
                                <CounterInput 
                                    underline
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
                            </Fragment>
                        ))
                    }
                </ScoresLayout>
        )
}

export default Scores