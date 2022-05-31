import styled from 'styled-components'

import {
    Text,
    BoldText,
    SmallText,
    BlackLabel,
} from './sharedComponents'

const ScoresLayout = styled.ul`
    grid-area: saves;

    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    grid-row-gap: 5px;
    grid-column-gap: 5px;

    padding: 0;
    margin: 0;

    max-height: 20em;

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
                    <SmallText>{translate('name')}</SmallText>
                    <Text>{translate('total')}</Text>
                    <SmallText>{translate('base')}</SmallText>
                    <SmallText>{translate('mod')}</SmallText>
                    {
                        [['fortitude', 'CON'], ['reflex', 'DEX'], ['will', 'WIS']].map(([name, score])=> (<>
                            <BlackLabel
                                name={translate(name)}
                            />
                            <BoldText box>{bonuses[name]+modifiers[score]}</BoldText>
                            <Text>{bonuses[name]}</Text>
                            <Text>{modifiers[score]}</Text>
                        </>
                        ))
                    }
                </ScoresLayout>
        )
}

export default Saves