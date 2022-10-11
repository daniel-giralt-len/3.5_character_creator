const validateLevel = (level, nLevel) => {
    const out = {}
    return out
}

const debugGetValidationErrors = true
const getValidationErrors = (accumulatedLevels) => {
    if(debugGetValidationErrors) { console.log('in',accumulatedLevels) }
    let errorsByLevel = []
    for(let levelIndex = 0; levelIndex <= accumulatedLevels.length-1; levelIndex++){
        const accumulatedData = {...errorsByLevel[levelIndex-1]} || {}
        errorsByLevel.push(validateLevel(accumulatedData, levelIndex))
    }
    if(debugGetValidationErrors){ console.log('out',errorsByLevel) }
    return errorsByLevel
}

export default getValidationErrors