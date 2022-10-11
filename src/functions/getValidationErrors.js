const validateLevel = ({
    nKnownLanguages,
    maxKnownLanguages,
    skillPoints,
    skillRanks
}, nLevel) => {
    return {
        language: {
            overBudget: nKnownLanguages > maxKnownLanguages
        },
        skills: {
            total: skillPoints.nUsed.added > skillPoints.nAvailable.added,
            single: Object
                .entries(skillRanks.added)
                .reduce((acc, [id, ranks]) => ({
                    ...acc,
                    [id]: ranks > skillRanks.maxPerSkill
                }), {})
        }
    }
}

const debugGetValidationErrors = true
const getValidationErrors = (accumulatedLevels) => {
    if(debugGetValidationErrors) { console.log('in',accumulatedLevels) }
    let errorsByLevel = []
    for(let levelIndex = 0; levelIndex <= accumulatedLevels.length-1; levelIndex++){
        const accumulatedData = accumulatedLevels[levelIndex] || {}
        errorsByLevel.push(validateLevel(accumulatedData, levelIndex))
    }
    if(debugGetValidationErrors){ console.log('out',errorsByLevel) }
    return errorsByLevel
}

export default getValidationErrors