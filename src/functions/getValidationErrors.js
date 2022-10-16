import skilltrickStats from '../db/json/itemData/skilltrickStats.json'
import isPrerequisiteFulfilled from './isPrerequisiteFullfilled';

const validateLevel = (levelData, nLevel) => {
    const {
        nKnownLanguages,
        maxKnownLanguages,
        skillPoints,
        skillRanks,
        skillTricks,
        classSkills,
    } = levelData
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
            isLevelOverBudget: val(skillPoints.nUsed.current > skillPoints.nAvailable.current),
            isOverBudget: Object
                .entries(skillRanks.added)
                .reduce((acc, [id, ranks]) => ({
                    ...acc,
                    [id]: val(ranks > (classSkills.added.includes(id) ? skillRanks.maxPerSkill.isClass : skillRanks.maxPerSkill.isNotClass))
                }), {}),
        },
        skillTricks: {
            // - your total skill tricks cannot exceed one-half your character level (rounded up).
            isTotalOverBudget: val(Math.ceil(nLevel/2) < skillTricks.added.length),
            singularErrors: skillTricks.added
                .reduce((acc,{id})=>({
                    ...acc,
                    [id]: {
                        unfullfilledPrerequisites: (skilltrickStats[id].prerequisites||[])
                            .filter(prerequisite => val(!isPrerequisiteFulfilled(prerequisite, levelData))),
                    }
                }),{})
        }
    }
    out.level = { anyError }
    return out
}

const debugGetValidationErrors = 1
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