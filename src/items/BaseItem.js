import styled from 'styled-components'
import findInDb from '../functions/findInDb'

const BaseItemWrapper = styled.div`
    padding: 15px;
    margin: 10px;
    
    background: ${({isAllowed}) => isAllowed ? '' : 'repeating-linear-gradient(90deg,#ffffff00,#ff000033 0px,#ffffff00 4px)'};
    
    box-shadow: 0px 0px 1px 0px #340000${({isSelected}) => isSelected ? ', inset 0px 0px 6px 3px #aafd81' : ''};

    display: flex;
    align-content: space-around;
    justify-content: space-between;
}`

const AddButton = styled.button`
    padding: 2px ${({isSelectable})=>isSelectable?8:10}px;
    font-size: 1.25em;
    box-shadow: 0px 0px 3px 0px #340000;
`

function BaseItem ({
    item,
    isSelected,
    isSelectable,
    onSelectItem,
    isAllowed,
    dbs,
    isExclusive,
    disabled,
    isLevel20
}) {
    
    const isAddable = !disabled && isAllowed && !(isExclusive && isSelected) && !isLevel20
    const { name, book, edition } = item

    const bookData = (findInDb(dbs, 'rulebooks', book) || {})
    const editionData = (findInDb(dbs, 'editions', edition) || {})

    return (<BaseItemWrapper 
        isAllowed={isAllowed} 
        isSelected={isSelected}
    >
        <div>
            {name}
            {bookData.name}
            {editionData.name}
        </div>
        {isAddable && (
            <AddButton onClick={onSelectItem} isSelectable={isSelectable}>
                {isSelectable ? '+' : '-'}
            </AddButton>
        )}
    </BaseItemWrapper>)

        //There are some classes such as the arcane devotee which have no associated book but have a hidden link to 
        //a book such as the player's guide to faehrun -- LINKS. The findInDb(dbs, 'rulebooks', book) check is there to guard
        //against such UNREGISTERED books. Will fix this maybe never. Yay.
    
}

export default BaseItem