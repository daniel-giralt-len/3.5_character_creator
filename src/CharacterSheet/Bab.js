import styled from 'styled-components'
import { BlackLabel, BoldText } from "./sharedComponents";

const BabLayout = styled.div`
    grid-area: bab;
    height: 50px;
    display: grid;
    grid-template-columns: 2fr 20px 1fr;
`

const Bab = ({
    bab,
    translate
})=> (
    <BabLayout>
        <BlackLabel
            name={translate('bab')}
            subtitle={translate('base attack power')}
        />
        <div/>
        <BoldText centered box>
            {bab || 0}
        </BoldText>
    </BabLayout>
)

export default Bab