import levelBase from '../db/json/characterByLevelBase.json'
import getMaxKnownLanguages from '../functions/getMaxKnownLanguages'
import raceStats from '../db/json/itemData/raceStats.json'

const mergeLanguages = (a={},b={}) => {
    return Array.from(
        new Set([
            ...Object.keys(a),
            ...Object.keys(b)
        ])
    ).reduce((acc, k) => ({
        ...acc,
        [k]: a[k] || b[k]
    }),{})
}

const calculateLevelData = (acc, level) => {
    const levelData = {
        ...acc,
        ...level,
        alignment: acc.alignment || level.alignment,
        name: acc.name || level.name,
        races: acc.races || level.races,
        class: level.class,
        language: mergeLanguages(acc.language, level.language),

        //so getMaxKnownLanguages work
        modifiers: {},
        skills: {},

        /* classAbilities,
        bonuses,
        feats
        saves
        scores
        skilltricks */
    }
    levelData.raceData = raceStats[levelData.races] || {}
    levelData.nKnownLanguages = Object.entries(levelData.language).filter(([_,k])=>k).map(([l])=>l).length
    levelData.maxKnownLanguages = getMaxKnownLanguages(levelData)

    return levelData
}

const getCumulativeLevels = (character, levelRevisionStart) => {
    console.log('in',character)
    let accumulatedLevelsList = []
    for(let levelIndex = levelRevisionStart; levelIndex <= character.length-1; levelIndex++){
        const accumulatedData = accumulatedLevelsList[levelIndex-1] || {}
        accumulatedLevelsList.push(calculateLevelData(accumulatedData, character[levelIndex]))
    }
    console.log('out',accumulatedLevelsList)
    return accumulatedLevelsList
}
export default getCumulativeLevels