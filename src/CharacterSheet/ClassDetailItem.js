import styled from 'styled-components'
import { Text, smallText, SquareButton } from '../sharedComponents';

const ButtonText = styled.div`${smallText}`

const VerticallyAlignedText = styled(Text)`
    display: flex;
    align-items: center
`

function ClassDetailItem({
    position,
    classData,
    onReorder,
    onDuplication,
    onDelete,
    onSelectedLevelChange,
    isSelected,
    canDuplicate = false,
    isFirstLevel = false,
    isLastLevel = false,
    errors = {}
}){
    const {name} = classData
    const level = position
    return (
        <>
            <Text
                centered
                onClick={onSelectedLevelChange}
                warning={errors.anyError}
                clickable
                info={isSelected}
            >
                {isSelected ? `>${level}<` : level}
            </Text>
            <VerticallyAlignedText
                small
                onClick={onSelectedLevelChange}
                warning={errors.anyError}
                clickable
                info={isSelected}
            >
                {isSelected ? `>${name}` : name}
            </VerticallyAlignedText>
            <div>
                {onDuplication && canDuplicate && (<SquareButton onClick={() => onDuplication(position-1)}>
                    <ButtonText>D</ButtonText>
                </SquareButton>)}
                {onDelete && <SquareButton onClick={() => onDelete(position-1)}>
                    <ButtonText>-</ButtonText>
                </SquareButton>}
                {onReorder && <SquareButton onClick={() => onReorder(position-1, 'up')} disabled={isFirstLevel}>
                    <ButtonText>^</ButtonText>
                </SquareButton>}
                {onReorder && <SquareButton onClick={() => onReorder(position-1, 'down')} disabled={isLastLevel}>
                    <ButtonText>v</ButtonText>
                </SquareButton>}
            </div>
        </>
    )
}

export default ClassDetailItem;