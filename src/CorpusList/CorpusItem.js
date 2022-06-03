import styled from 'styled-components'
import { Text } from '../sharedComponents'

const CorpusItemWrapper = styled(Text)`
    ${({allowed}) => allowed ? `font-weight: 600;` : `text-decoration: line-through;`}
    border-right: 1px dashed black;
    padding: 0px 5px;
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