import { useState } from 'react';

const accents = [
    [/[aàáäâ]/g, 'a'],
    [/[eèéëê]/g, 'e'],
    [/[iìíïî]/g, 'i'],
    [/[oòóöô]/g, 'o'],
    [/[uùúüû]/g, 'u'],
    [/[nñ]/g, 'n'],
    [/ +/g, ' '],
]

function renderItems({items, searchedText, ItemRenderer, selectedList, handleCreationChange}) {
    let regexText = searchedText.toLocaleLowerCase()
    accents.forEach(accent => regexText = regexText.replace(accent[0], accent[1]))
    const regex = new RegExp(regexText)

    return items
        .filter(item => item.name.toLocaleLowerCase().match(regex))
        .map(item => (<ItemRenderer
            key={item.id}
            item={item}
            selectedList={selectedList}
            isSelected={selectedList[item.id] === true}
            onClick={() => handleCreationChange(item.id, selectedList)}
        />))
}

function ItemSearchBar({onChange}){
    return (<textarea onChange={onChange}></textarea>)
}

function ItemBrowser({items, selected={}, ItemRenderer, handleCreationChange}) {
    const [searchedText, setSearchedText] = useState('')
    const handleSearchChange = event => setSearchedText(event.target.value || '')
    const handleCreationItemSelection = (id, selectedList) => handleCreationChange({ 
        ...selectedList,
        [id]: !selectedList[id]
    })

    return (
        <div>
            <ItemSearchBar onChange={handleSearchChange} />
            {renderItems({
                items,
                searchedText,
                ItemRenderer,
                selectedList: selected,
                handleCreationChange: handleCreationItemSelection
            })}
        </div>
    );
}

export default ItemBrowser;
