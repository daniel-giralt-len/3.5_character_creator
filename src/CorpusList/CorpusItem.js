import styled from 'styled-components'
import { Text } from '../sharedComponents'

const CorpusItemWrapper = styled(Text)`
    ${({allowed}) => allowed ? `font-weight: 600;` : `text-decoration: line-through;`}
`

const CorpusItem = ({
    name,
    allowed,
    forbidden,
}) => (<CorpusItemWrapper
        allowed={allowed}
        forbidden={forbidden}
    >
    {name}
</CorpusItemWrapper>)

export default CorpusItem