const isItemAllowed = ({isCorpus, corpus, item, itemType}) => isCorpus 
    || (
        itemType === 'language' ||
        (corpus[itemType] && corpus[itemType].allowed === '*') ||
        corpus.rulebooks[item.book] === true ||
        (corpus[itemType] && corpus[itemType][item.id] === true)
    )

export default isItemAllowed