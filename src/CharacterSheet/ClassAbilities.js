import styled from 'styled-components'
import { Text, SidewaysBlackLabel } from '../sharedComponents';

const ClassAbilitiesLayout = styled.ul`
    grid-area: class-skills;
    padding: 0;
    margin: 0;
    ${({warning}) => warning ? `
    background: #ff000033;
    ` : ''};
`

const Header = SidewaysBlackLabel

const ClassAbilities = ({
    classAbilities,
    translate
}) => (
    <ClassAbilitiesLayout>
            <Header name={translate('abilities')}/>
            {Object.entries(classAbilities)
                .map(([name, count])=>(
                    <Text small>
                        {`${name} (${count})`}
                    </Text>
                ))}
        </ClassAbilitiesLayout>
)


export default ClassAbilities