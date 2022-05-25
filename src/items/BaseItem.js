import styled from 'styled-components'

const BaseItemWrapper = styled.div`
    padding: 15px;
    margin: 10px;
    
    background: ${({isAllowed}) => isAllowed ? '' : 'repeating-linear-gradient(90deg,#ffffff00,#ff000033 0px,#ffffff00 4px)'};
    
    box-shadow: 0px 0px 1px 0px #340000${({isSelected}) => isSelected ? ', inset 0px 0px 6px 3px #aafd81' : ''};
`

function BaseItem ({item, isSelected, onClick, isAllowed}) {
    return (<BaseItemWrapper 
        onClick={isAllowed ? onClick: ()=>{}} 
        isAllowed={isAllowed} 
        isSelected={isSelected}
    >
        <span>{item.name}</span>
        <input type='checkbox' disabled checked={isSelected}/>
    </BaseItemWrapper>)
}

export default BaseItem