import levelBase from '../db/json/characterByLevelBase.json'
import getMaxKnownLanguages from '../functions/getMaxKnownLanguages'
import raceStats from '../db/json/itemData/raceStats.json'
import getModifiersFromScores from './getModifiersFromScores'
import calculateCharacterBonuses from './calculateCharacterBonuses'
import getClassSkills from './getClassSkills'

import mergePreviousAndCurrent from './accumulationFunctions/mergePreviousAndCurrent'
import getAvailableSkillPoints from './getAvailableSkillPoints'
import convertSkillPointsToRanks from './convertSkillPointsToRanks'
import getRevisionBasedObject from './accumulationFunctions/getRevisionBasedObject'

const addMergeMethod = (va,vb)=>(va||0)+(vb||0)

const mergeLanguages = (a,b) => mergePreviousAndCurrent(a,b,(va,vb)=>va||vb)
const mergeSkillPoints = (a,b) => mergePreviousAndCurrent(a,b,addMergeMethod)
const mergeSkillRanks = (a,b) => mergePreviousAndCurrent(a,b,addMergeMethod)
const mergeScores = (a,b) => mergePreviousAndCurrent(a,b,addMergeMethod)
const countLanguages = language => Object.entries(language).filter(([_,k])=>k).length
const countSkillPoints = points => Object.values(points).reduce((acc,n)=>acc+n,0)

const calculateLevelData = (acc, level, nLevel) => {
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
        scores: getRevisionBasedObject(level, acc, 'scores', mergeScores),
        skillPoints: getRevisionBasedObject(level, acc, 'skillPoints', mergeSkillPoints),

        /* classAbilities,
        feats
        skilltricks */
    }


    levelData.raceData = raceStats[levelData.races] || {}

    levelData.bonuses = calculateCharacterBonuses({
        raceData: levelData.raceData,
        classes: levelData.classes
    })
   
    levelData.modifiers = getModifiersFromScores(levelData.scores.added, levelData.bonuses)
    
    levelData.classSkills = getClassSkills(levelData.classes)

    levelData.skillPoints.nAvailable = getRevisionBasedObject(level, acc, ['skillPoints','nAvailable'], 
    (previous, current) => previous + current,
    {
        defaultPrevious: 0,
        getCurrent: () => getAvailableSkillPoints({
            classId: levelData.class,
            nLevel,
            raceData: levelData.raceData,
            modifiers: levelData.modifiers,
        }),
    })
    levelData.skillPoints.nUsed = getRevisionBasedObject(level, acc, ['skillPoints','nUsed'], 
    (previous, current) => previous + current, {
        defaultPrevious: 0,
        getCurrent: () => countSkillPoints(levelData.skillPoints.current||{})
    })

    levelData.skillRanks = getRevisionBasedObject(level, acc, 'skillRanks', mergeSkillRanks, {
        getCurrent: () => convertSkillPointsToRanks({
            ranks: levelData.skillPoints.current || {},
            classSkills: levelData.classSkills || [],
        })
    })
    levelData.skillRanks.maxPerSkill = nLevel+3

    levelData.nKnownLanguages = countLanguages(levelData.language) + countLanguages(levelData.raceData['automatic languages'] || {})
    levelData.maxKnownLanguages = getMaxKnownLanguages({
        modifiers: levelData.modifiers,
        raceData: levelData.raceData,
        skillRanks: levelData.skillRanks,
    })
    
    return levelData
}

const getCumulativeLevels = (character, levelRevisionStart) => {
    console.log('in',character)
    let accumulatedLevelsList = []
    for(let levelIndex = 0/* levelRevisionStart */; levelIndex <= character.length-1; levelIndex++){ //for the moment, recalculate all levels, we can optimize later
        const accumulatedData = accumulatedLevelsList[levelIndex-1] || {}
        accumulatedLevelsList.push(calculateLevelData(accumulatedData, character[levelIndex], levelIndex))
    }
    console.log('out',accumulatedLevelsList)
    return accumulatedLevelsList
}
export default getCumulativeLevels