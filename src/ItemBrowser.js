import React, { useState } from 'react';

function renderItems(items, searchedText) {
    const accents = [
        [/[aàáäâ]/g, 'a'],
        [/[eèéëê]/g, 'e'],
        [/[iìíïî]/g, 'i'],
        [/[oòóöô]/g, 'o'],
        [/[uùúüû]/g, 'u'],
        [/[nñ]/g, 'n'],
        [/ +/g, ' '],
    ]
    let regexText = searchedText.toLocaleLowerCase()
    accents.forEach(accent => regexText = regexText.replace(accent[0], accent[1]))
    const regex = new RegExp(regexText)

    return items
        .filter(item => item.name.toLocaleLowerCase().match(regex))
        .map(item => (<div key={item.id}>{item.name}</div>))
}

function ItemSearchBar({onChange}){
    return (<textarea onChange={onChange}></textarea>)
}

function ItemBrowser({items}) {
    const [searchedText, setSearchedText] = useState('')
    const handleSearchChange = event => setSearchedText(event.target.value || '')
    return (
        <div>
            <ItemSearchBar onChange={handleSearchChange} />
            {renderItems(items, searchedText)}
        </div>
    );
}

export default ItemBrowser;
