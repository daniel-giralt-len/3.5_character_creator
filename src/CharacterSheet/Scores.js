import styled from 'styled-components'
import { Fragment } from 'react'

import {
    CounterInput,
    Text,
    BlackLabel,
} from '../sharedComponents'

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
                    <Text small>{translate('name')}</Text>
                    <Text small>{translate('mod')}</Text>
                    <Text small>{translate('total')}</Text>
                    <Text small>{translate('base')}</Text>
                    <Text small>{translate('race')}</Text>
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
                                <Text bold box>
                                    {value+bonuses[id]}
                                </Text>
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