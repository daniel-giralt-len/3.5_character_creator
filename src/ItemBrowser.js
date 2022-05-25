import { useState } from 'react';
import styled from 'styled-components'

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
        itemType === 'language' ||
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
    itemType,
    isCorpus
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
            isAllowed={isCorpus || isItemPermitted({corpus: permittedCorpus, item, itemType})}
        />))
}

const ItemSearchBar = styled.textarea`
    resize: none;
`

function ItemBrowser({items,
    selected={},
    ItemRenderer,
    handleCreationChange,
    permittedCorpus,
    itemType,
    isCorpus,
    isExclusive,
    disabled
}) {
    const [searchedText, setSearchedText] = useState('')
    const handleSearchChange = event => setSearchedText(event.target.value || '')
    const handleCreationItemSelection = disabled ? () => {} : (id, selectedList) => {
        const out = isExclusive ? {[id]: true} : { 
            ...selectedList,
            [id]: !selectedList[id]
        }
        handleCreationChange(out)
    }

    return (
        <div>
            <ItemSearchBar rows={1} cols={50} key={itemType} onChange={handleSearchChange} />
            {renderItems({
                items,
                searchedText,
                ItemRenderer,
                selectedList: selected,
                handleCreationChange: handleCreationItemSelection,
                permittedCorpus,
                itemType,
                isCorpus
            })}
        </div>
    );
}

export default ItemBrowser;
