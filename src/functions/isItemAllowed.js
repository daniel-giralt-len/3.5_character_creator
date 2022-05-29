const isItemAllowed = ({isCorpus, corpus, item, itemType}) => isCorpus 
    || (
        itemType === 'language' ||
        corpus === '*' ||
        corpus.rulebooks[item.book] === true ||
        (corpus[itemType] && corpus[itemType][item.id] === true)
    )

export default isItemAllowed