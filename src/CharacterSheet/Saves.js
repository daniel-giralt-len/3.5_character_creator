import styled from 'styled-components'
import { Fragment } from 'react'

import {
    Text,
    BlackLabel,
} from '../sharedComponents'

const ScoresLayout = styled.ul`
    grid-area: saves;

    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
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

function Saves({
        bonuses,
        modifiers,
        translate,
    }){
        return(
                <ScoresLayout>
                    <Text small>{translate('name')}</Text>
                    <Text small>{translate('total')}</Text>
                    <Text small>{translate('base')}</Text>
                    <Text small>{translate('mod')}</Text>
                    {
                        [['fortitude', 'CON'], ['reflex', 'DEX'], ['will', 'WIS']].map(([name, score])=> (<Fragment key={name}>
                            <BlackLabel
                                name={translate(name)}
                                subtitle={`(${translate(`${score}_long`)})`}
                            />
                            <Text bold box>{bonuses[name]+modifiers[score]}</Text>
                            <Text>{bonuses[name]}</Text>
                            <Text>{modifiers[score]}</Text>
                        </Fragment>
                        ))
                    }
                </ScoresLayout>
        )
}

export default Saves