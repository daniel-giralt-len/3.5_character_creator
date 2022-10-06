import levelBase from '../db/json/characterByLevelBase.json'
import getMaxKnownLanguages from '../functions/getMaxKnownLanguages'
import raceStats from '../db/json/itemData/raceStats.json'
import getModifiersFromScores from './getModifiersFromScores'
import calculateCharacterBonuses from './calculateCharacterBonuses'

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

const countLanguages = language => Object.entries(language).filter(([_,k])=>k).map(([l])=>l).length

const abilityScores = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

const calculateLevelData = (acc, level) => {
    const levelData = {
        ...acc,
        ...level,
        alignment: acc.alignment || level.alignment,
        name: acc.name || level.name,
        races: acc.races || level.races,
        class: level.class,
        language: mergeLanguages(acc.language, level.language),
        classes: [
            ...acc.classes || [],
            level.class
        ].filter(v=>v), //filter to remove lvl 0 which has no class
        scores: {
            current: {...level.scores},
            previous: {...(acc.scores||{}).added || {} }
        },

        //so getMaxKnownLanguages work
        skills: {},

        /* classAbilities,
        bonuses,
        feats
        saves
        scores
        skilltricks */
    }
    levelData.scores.added = abilityScores
        .reduce((scoresAcc, k) => {
            const addedScore = ((levelData.scores.previous||{})[k]||0) + ((levelData.scores.current||{})[k]||0)
            return {
                ...scoresAcc,
                [k]: addedScore
            }
        }, {})
    levelData.raceData = raceStats[levelData.races] || {}
    levelData.bonuses = calculateCharacterBonuses({
        raceData: levelData.raceData,
        classes: levelData.classes
    })
    levelData.modifiers = getModifiersFromScores(levelData.scores.added, levelData.bonuses)
    levelData.nKnownLanguages = countLanguages(levelData.language) + countLanguages(levelData.raceData['automatic languages'] || {})
    levelData.maxKnownLanguages = getMaxKnownLanguages(levelData)

    return levelData
}

const getCumulativeLevels = (character, levelRevisionStart) => {
    let accumulatedLevelsList = []
    for(let levelIndex = 0/* levelRevisionStart */; levelIndex <= character.length-1; levelIndex++){ //for the moment, recalculate all levels, we can optimize later
        const accumulatedData = accumulatedLevelsList[levelIndex-1] || {}
        accumulatedLevelsList.push(calculateLevelData(accumulatedData, character[levelIndex]))
    }
    console.log('in',character,' ---- out',accumulatedLevelsList)
    return accumulatedLevelsList
}
export default getCumulativeLevels