import styled from 'styled-components'
import { BlackLabel, Text } from "./sharedComponents";

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
        <Text bold centered box>
            {bab || 0}
        </Text>
    </BabLayout>
)

export default Bab