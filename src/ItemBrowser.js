import { useState } from 'react';
import styled from 'styled-components'
import BaseItem from './items/BaseItem'

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
    selectedList,
    handleCreationChange,
    permittedCorpus,
    itemType,
    isCorpus,
    dbs,
    isExclusive,
    disabled,
    userFilters,
    isLevel20
}) {
    let regexText = searchedText.toLocaleLowerCase()
    accents.forEach(accent => regexText = regexText.replace(accent[0], accent[1]))
    const regex = new RegExp(regexText)

    let filteredItems = items
    if(userFilters.showDisallowed === false){
        filteredItems = filteredItems
            .filter(item => isCorpus || isItemPermitted({corpus: permittedCorpus, item, itemType}))
    }

    return filteredItems
        .filter(item => item.name.toLocaleLowerCase().match(regex))
        .map(item => (<BaseItem
            key={item.id}
            item={item}
            isSelected={selectedList[item.id] === true}
            handleItemSelection={() => handleCreationChange(item.id, selectedList)}
            isAllowed={isCorpus || isItemPermitted({corpus: permittedCorpus, item, itemType})}
            isExclusive={isExclusive}
            disabled={disabled}
            dbs={dbs}
            isLevel20={isLevel20}
        />))
}

const ItemSearchBar = styled.textarea`
    resize: none;
`

function ItemBrowser({
    items,
    selected={},
    handleCreationChange,
    permittedCorpus,
    itemType,
    isCorpus,
    isExclusive,
    disabled,
    dbs,
    userFilters
}) {
    const isLevel20 = itemType==='classes' && selected.length === 20
    const [searchedText, setSearchedText] = useState('')
    const handleSearchChange = event => setSearchedText(event.target.value || '')
    const handleCreationItemSelection = (id, selectedList) => {
        if(disabled) return
        if(itemType === 'classes' && !isCorpus){
            const out = [...selectedList, id]
            return handleCreationChange(out)
        }
        const out = isExclusive ? id : {
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
                selectedList: selected,
                handleCreationChange: handleCreationItemSelection,
                permittedCorpus,
                itemType,
                isCorpus,
                dbs,
                isExclusive,
                disabled,
                userFilters,
                isLevel20
            })}
        </div>
    );
}

export default ItemBrowser;
