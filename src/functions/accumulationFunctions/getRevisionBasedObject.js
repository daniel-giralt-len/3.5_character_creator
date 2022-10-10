const getRevisionBasedObject = (
    level = {},
    accumulatedLevelData = {},
    attributeName = '',
    getAdded = () => {},
    {
        defaultCurrent = {},
        defaultPrevious = {},
        getCurrent,
        getPrevious,
    }) => {
    const current = getCurrent 
        ? getCurrent() 
        : level[attributeName] || defaultCurrent
    const previous =  getPrevious 
        ? getPrevious()
        :(accumulatedLevelData[attributeName] || {}).added || defaultPrevious
    const added = getAdded(current, previous)
    return { current, previous, added }
}

export default getRevisionBasedObject