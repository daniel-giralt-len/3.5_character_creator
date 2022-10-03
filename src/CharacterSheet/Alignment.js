import styled from 'styled-components'
import { 
    Text
} from '../sharedComponents';

const AlignmentWrapper = styled.div`
    grid-area: alignment;
`


const AlignmentTable = styled.ul`
    display: grid;
    align-content: center;
    justify-content: center;

    grid-template-columns: repeat(3, auto);
    grid-row-gap: 16px;
    grid-column-gap: 16px;

    padding: 0;
    margin: 0
`

const AlignmentItem = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${({disabled}) => disabled && `
    pointer-events: none;
    background: #c4c4c4;
    `}
`

const alignments = [
    {name: 'lawful good',     object: {legality: 'lawful',  goodness: 'good'}},
    {name: 'lawful neutral',  object: {legality: 'lawful',  goodness: 'neutral'}},
    {name: 'lawful evil',     object: {legality: 'lawful',  goodness: 'evil'}},
    {name: 'neutral good',    object: {legality: 'neutral', goodness: 'good'}},
    {name: 'neutral neutral', object: {legality: 'neutral', goodness: 'neutral'}},
    {name: 'neutral evil',    object: {legality: 'neutral', goodness: 'evil'}},
    {name: 'chaotic good',    object: {legality: 'chaotic', goodness: 'good'}},
    {name: 'chaotic neutral', object: {legality: 'chaotic', goodness: 'neutral'}},
    {name: 'chaotic evil',    object: {legality: 'chaotic', goodness: 'evil'}},
]

const compareAlignments = (a,b) => (a.legality === b.legality) && (a.goodness === b.goodness)

const Alignment = ({
    alignment,
    disabled,
    onAlignmentChange,
    translate
}) => (
        <AlignmentWrapper>
            <AlignmentTable>
                {alignments
                    .map(({name, object}) => (
                        <AlignmentItem
                            disabled={disabled}
                            onClick={() => onAlignmentChange(object)}
                            key={name}
                        >
                            <Text underline={compareAlignments(alignment, object)}>
                                {translate(name)}
                            </Text>
                        </AlignmentItem>
                    ))
                }
            </AlignmentTable>
            <Text small>{translate('alignment')}</Text>
        </AlignmentWrapper>
)

export default Alignment