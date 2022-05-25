import { useState } from 'react';

function renderItems(items, searchedText, ItemRenderer) {
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
        .map(item => (<ItemRenderer key={item.id} item={item} />))
}

function ItemSearchBar({onChange}){
    return (<textarea onChange={onChange}></textarea>)
}

function ItemBrowser({items, ItemRenderer}) {
    const [searchedText, setSearchedText] = useState('')
    const handleSearchChange = event => setSearchedText(event.target.value || '')
    return (
        <div>
            <ItemSearchBar onChange={handleSearchChange} />
            {renderItems(items, searchedText, ItemRenderer)}
        </div>
    );
}

export default ItemBrowser;
