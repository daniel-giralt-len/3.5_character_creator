function BaseItem ({item, isSelected='blast', onClick, selectedList}) {
    return (<div onClick={onClick}>
        <span>{item.name}</span>
        <input type='checkbox' disabled checked={isSelected}/>
    </div>)
}

export default BaseItem