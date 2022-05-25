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

function isItemPermitted({corpus, item, itemType}){
    return (
        corpus === '*' ||
        corpus.rulebooks[item.book] === true ||
        (corpus[itemType] && corpus[itemType][item.id] === true)
    )
}

function renderItems({items,
    searchedText,
    ItemRenderer,
    selectedList,
    handleCreationChange,
    permittedCorpus,
    itemType
}) {
    let regexText = searchedText.toLocaleLowerCase()
    accents.forEach(accent => regexText = regexText.replace(accent[0], accent[1]))
    const regex = new RegExp(regexText)

    return items
        .filter(item => item.name.toLocaleLowerCase().match(regex))
        .map(item => (<ItemRenderer
            key={item.id}
            item={item}
            isSelected={selectedList[item.id] === true}
            onClick={() => handleCreationChange(item.id, selectedList)}
            isAllowed={isItemPermitted({corpus: permittedCorpus, item, itemType})}
        />))
}

function ItemSearchBar({onChange}){
    return (<textarea onChange={onChange}></textarea>)
}

function ItemBrowser({items, selected={}, ItemRenderer, handleCreationChange, permittedCorpus, itemType}) {
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
                handleCreationChange: handleCreationItemSelection,
                permittedCorpus,
                itemType
            })}
        </div>
    );
}

export default ItemBrowser;
