const getRevisionBasedObject = (
    level = {},
    accumulatedLevelData = {},
    attributeName = '',
    {
        defaultLevelAttribute = {},
        defaultAccumulatedLevelDataAttribute = {},
        getAdded = () => {}
    }) => {
    const current = level[attributeName] || {}
    const previous = (accumulatedLevelData[attributeName] || {}).added || {}
    const added = getAdded(current, previous)
    return { current, previous, added }
}

export default getRevisionBasedObject