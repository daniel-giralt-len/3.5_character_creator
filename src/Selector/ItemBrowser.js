import { useState } from 'react';
import BaseItem from './BaseItem'
import getItemRegex from '../functions/getItemRegex';
import isItemAllowed from '../functions/isItemAllowed';
import ItemSearchBar from './ItemSearchBar';

function renderItems({
    items,
    selectedList,
    onSelectItem,
    permittedCorpus,
    itemType,
    isCorpus,
    isExclusive,
    disabled,
    isLevel20
}) {
    const canBeAddedMultipleTimes = !isCorpus && itemType === 'classes'

    const isSelected = id => (itemType === 'races' && selectedList === id)
        || (itemType === 'classes' && Array.isArray(selectedList) && selectedList.find(i=>i === id))
        || selectedList[id] === true

    return items
        .map(item => (<BaseItem
            key={item.id}
            item={item}
            isSelected={isSelected(item.id)}
            isSelectable={!isSelected(item.id) || (itemType==='classes')}
            onSelectItem={() => onSelectItem(item.id, selectedList)}
            isAllowed={isItemAllowed({isCorpus, corpus: permittedCorpus, item, itemType})}
            isExclusive={isExclusive}
            disabled={disabled}
            isLevel20={isLevel20}
            canBeAddedMultipleTimes={canBeAddedMultipleTimes}
        />))
}



function ItemBrowser({
    items,
    selected={},
    onCreationChange,
    permittedCorpus,
    itemType,
    isCorpus,
    isExclusive,
    disabled,
    userFilters = {},
    translate
}) {
    const [searchedText, setSearchedText] = useState('')
    const searchRegex = getItemRegex(searchedText)

    const isLevel20 = itemType === 'classes' && selected.length === 20

    let filteredItems = items
        .filter(item => searchRegex.test(item.name))
        .filter(item => userFilters.showDisallowed || isItemAllowed({isCorpus, corpus: permittedCorpus, item, itemType}))

    const handleSearchChange = event => setSearchedText(event.target.value || '')
    const handleCreationItemSelection = (id, selectedList) => {
        if(disabled) return
        if(itemType === 'classes' && !isCorpus){
            const out = [...selectedList, id]
            return onCreationChange(out)
        }
        const out = isExclusive ? id : {
            ...selectedList,
            [id]: !selectedList[id]
        }
        onCreationChange(out)
    }

    return (
        <div>
            <ItemSearchBar
                onChange={handleSearchChange}
                translate={translate}
            />
            {renderItems({
                items: filteredItems,
                selectedList: selected,
                onSelectItem: handleCreationItemSelection,
                permittedCorpus,
                itemType,
                isCorpus,
                isExclusive,
                disabled,
                isLevel20
            })}
        </div>
    );
}

export default ItemBrowser;
