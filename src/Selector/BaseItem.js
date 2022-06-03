import styled from 'styled-components'

import findInDb from '../functions/findInDb'

const BaseItemWrapper = styled.div`
    padding: 2px 10px;
    margin: 5px 10px;
    
    ${({isForbidden, isAllowed}) => (isForbidden || !isAllowed) ? `text-decoration: line-through;
    background: #ff000033`: ''};
    
    box-shadow: 0px 0px 1px 0px #340000;
    ${({isSelected}) => isSelected ? 'border: 2px solid #aafd81' : ''};

    ${({hoverable})=>hoverable?`&:hover { 
        box-shadow: 0 0 3px 0px #340000; 
    }`:''}

    display: flex;
    align-content: space-around;
    justify-content: space-between;
    align-items: center;
}`

const AddButton = styled.button`
    box-shadow: 0px 0px 1px 0px #340000;
    ${({hoverable})=>hoverable?`&:hover { box-shadow: 0 0 3px 0px #340000; }`:''}
`

const LessImportantText = styled.span`
    margin-right: 5px;
    font-weight: 400;
    font-size: 0.75em;
    color: #00000080;
`

function BaseItem ({
    item,
    isSelected,
    isForbidden,
    isSelectable,
    onSelectItem,
    isAllowed,
    isExclusive,
    disabled,
    isLevel20,
    canBeAddedMultipleTimes
}) {
    const isAddable = !disabled && isAllowed && !(isExclusive && isSelected) && !isLevel20
    const { name, book } = item

    const bookDataName = (findInDb('rulebooks', book) || {}).name

    return (<BaseItemWrapper 
        isAllowed={isAllowed} 
        isSelected={isSelected}
        isForbidden={isForbidden}
        hoverable={isAddable && !canBeAddedMultipleTimes}
        onClick={isAddable && !canBeAddedMultipleTimes && onSelectItem}
    >
        <div>
            {name}
        </div>
        <div>
            {bookDataName && (<LessImportantText>
                {bookDataName}
            </LessImportantText>)}
            {isAddable && canBeAddedMultipleTimes && (
                <AddButton
                    hoverable={isAddable && canBeAddedMultipleTimes}
                    onClick={onSelectItem}
                >
                    {isSelectable ? '+' : '-'}
                </AddButton>
            )}
        </div>
    </BaseItemWrapper>)

        //There are some classes such as the arcane devotee which have no associated book but have a hidden link to 
        //a book such as the player's guide to faehrun -- LINKS. The findInDb('rulebooks', book) check is there to guard
        //against such UNREGISTERED books. Will fix this maybe never. Yay.
    
}

export default BaseItem