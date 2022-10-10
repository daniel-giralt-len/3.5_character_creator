const getValFromNest = (obj, keys)=>{
    if(!Array.isArray(keys)) { return obj[keys] }
    return keys.reduce((subObj, key) => subObj[key], obj);
}

const getRevisionBasedObject = (
    level = {},
    accumulatedLevelData = {},
    keys,
    getAdded = () => {},
    options = {}
) => {
    const {
        defaultCurrent = {},
        defaultPrevious = {},
        getCurrent,
        getPrevious,
    } = options
    const current = getCurrent 
        ? getCurrent() 
        : getValFromNest(level, keys) || defaultCurrent
    const previous =  getPrevious 
        ? getPrevious()
        :(getValFromNest(accumulatedLevelData, keys) || {}).added || defaultPrevious
    const added = getAdded(current, previous)
    return { current, previous, added }
}

export default getRevisionBasedObject