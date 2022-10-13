const validateLevel = ({
    nKnownLanguages,
    maxKnownLanguages,
    skillPoints,
    skillRanks
}, nLevel) => {
    let anyError = false
    const val = e => {
        anyError = anyError || e;
        return e;
    }
    const out = {
        language: {
            overBudget: val(nKnownLanguages > maxKnownLanguages)
        },
        skills: {
            isTotalOverbudget: val(skillPoints.nUsed.added > skillPoints.nAvailable.added),
            isOverBudget: Object
                .entries(skillRanks.added)
                .reduce((acc, [id, ranks]) => ({
                    ...acc,
                    [id]: val(ranks > skillRanks.maxPerSkill)
                }), {})
        }
    }
    out.level = { anyError }
    return out
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