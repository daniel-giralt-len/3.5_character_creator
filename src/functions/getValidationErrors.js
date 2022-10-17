import skilltrickStats from '../db/json/itemData/skilltrickStats.json'
import featStats from '../db/json/itemData/featStats.json'
import classStats from '../db/json/itemData/classStats.json'
import isPrerequisiteFulfilled from './isPrerequisiteFullfilled';

const validateLevel = (levelData, nLevel) => {
    const {
        nKnownLanguages,
        maxKnownLanguages,
        skillPoints,
        skillRanks,
        skillTricks,
        classSkills,
        featSlots,
        class: classId
    } = levelData
    let anyError = false
    const val = e => {
        anyError = anyError || e;
        return e;
    }

    console.log(classSkills.added)
    console.log(skillRanks.added)
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
                    [id]: val(ranks > (classSkills.added.includes(parseInt(id)) ? skillRanks.maxPerSkill.isClass : skillRanks.maxPerSkill.isNotClass))
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
        },
        feats: featSlots.added
                .map(({id}) => ((featStats[id]||{}).prerequisites||[])
                                    .filter(prerequisite => val(!isPrerequisiteFulfilled(prerequisite, levelData)))
                    ).filter(v=>v),
        class: Object
            .entries((classStats[classId]||{}).requirements||{})
            .map(([type, value])=>({type, value}))
            .filter(prerequisite => val(!isPrerequisiteFulfilled(prerequisite, levelData)))
            .filter(v=>v)
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