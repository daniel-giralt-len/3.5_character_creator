function BaseItem ({item, isSelected='blast', onClick, isAllowed}) {
    return (<div onClick={isAllowed ? onClick: ()=>{}}>
        <span>{item.name}</span>
        <input type='checkbox' disabled checked={isSelected}/>
        {isAllowed ? 'ALLOWED' : 'NOT ALLOWED'}
    </div>)
}

export default BaseItem