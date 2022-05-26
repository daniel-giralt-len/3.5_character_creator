import styled from 'styled-components'
import findInDb from '../findInDb'

const BaseItemWrapper = styled.div`
    padding: 15px;
    margin: 10px;
    
    background: ${({isAllowed}) => isAllowed ? '' : 'repeating-linear-gradient(90deg,#ffffff00,#ff000033 0px,#ffffff00 4px)'};
    
    box-shadow: 0px 0px 1px 0px #340000${({isSelected}) => isSelected ? ', inset 0px 0px 6px 3px #aafd81' : ''};
`

function BaseItem ({item, isSelected, handleItemSelection, isAllowed, dbs, isExclusive}) {
    
    const isAddable = isAllowed && !(isExclusive && isSelected)
    const { name, book, edition } = item

    return (<BaseItemWrapper 
        isAllowed={isAllowed} 
        isSelected={isSelected}
    >
        <span>{name}</span>
        {book && findInDb(dbs, 'rulebooks', book) && findInDb(dbs, 'rulebooks', book).name}
        {edition && findInDb(dbs, 'editions', edition) && findInDb(dbs, 'editions', edition).name}
        {isAddable && (<button onClick={handleItemSelection}>{isSelected ? '-' : '+'}</button>)}
    </BaseItemWrapper>)

        //There are some classes such as the arcane devotee which have no associated book but have a hidden link to 
        //a book such as the player's guide to faehrun -- LINKS. The findInDb(dbs, 'rulebooks', book) check is there to guard
        //against such UNREGISTERED books. Will fix this maybe never. Yay.
    
}

export default BaseItem