import styled from 'styled-components'
import { Text, smallText, SquareButton } from './sharedComponents';

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
    nLevels,
}){
    const isLevel20 = nLevels === 20
    const {name} = classData
    const level = position+1
    return (
        <>
            <Text centered>{level}</Text>
            <VerticallyAlignedText small>{name}</VerticallyAlignedText>
            <div>
                {!isLevel20 && (<SquareButton onClick={() => onDuplication(position)}>
                    <ButtonText>D</ButtonText>
                </SquareButton>)}
                <SquareButton onClick={() => onDelete(position)}>
                    <ButtonText>-</ButtonText>
                </SquareButton>
                <SquareButton onClick={() => onReorder(position, 'up')} disabled={position === 0}>
                    <ButtonText>^</ButtonText>
                </SquareButton>
                <SquareButton onClick={() => onReorder(position, 'down')} disabled={position === (nLevels-1)}>
                    <ButtonText>v</ButtonText>
                </SquareButton>
            </div>
        </>
    )
}

export default ClassDetailItem;