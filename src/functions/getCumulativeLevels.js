import levelBase from '../db/json/characterByLevelBase.json'
import getMaxKnownLanguages from '../functions/getMaxKnownLanguages'
import raceStats from '../db/json/itemData/raceStats.json'
import getModifiersFromScores from './getModifiersFromScores'
import calculateCharacterBonuses from './calculateCharacterBonuses'
import getClassSkills from './getClassSkills'

import mergePreviousAndCurrent from './accumulationFunctions/mergePreviousAndCurrent'
import getAvailableSkillRanks from './getAvailableSkillRanks'
import convertSkillRanksToPoints from './convertSkillRanksToPoints'

const addMergeMethod = (va,vb)=>(va||0)+(vb||0)

const mergeLanguages = (a,b) => mergePreviousAndCurrent(a,b,(va,vb)=>va||vb)
const mergeSkillRanks = (a,b) => mergePreviousAndCurrent(a,b,addMergeMethod)
const mergeScores = (a,b) => mergePreviousAndCurrent(a,b,addMergeMethod)
const countLanguages = language => Object.entries(language).filter(([_,k])=>k).length

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
        scores: {
            current: {...level.scores},
            previous: {...(acc.scores||{}).added || {} }
        },
        skillRanks: {
            current: {...level.skillRanks || {}},
            previous: {...(acc.skillRanks|| {}).added || {} },
            maxPerSkill: nLevel+3,
            nAvailable: {
                previous: ((acc.skillRanks||{}).nAvailable||{}).added || 0,
            }
        },
        skillPoints: {
            previous: {...(acc.skillPoints|| {}).added || {} },
        },

        //so getMaxKnownLanguages work
        skills: {},

        /* classAbilities,
        feats
        skilltricks */
    }


    levelData.raceData = raceStats[levelData.races] || {}

    levelData.nKnownLanguages = countLanguages(levelData.language) + countLanguages(levelData.raceData['automatic languages'] || {})


    levelData.scores.added = mergeScores(levelData.scores.current, levelData.scores.previous)
    
    levelData.bonuses = calculateCharacterBonuses({
        raceData: levelData.raceData,
        classes: levelData.classes
    })
   
    levelData.modifiers = getModifiersFromScores(levelData.scores.added, levelData.bonuses)
    

    levelData.classSkills = getClassSkills(levelData.classes)
    
    levelData.skillRanks.added = mergeSkillRanks(levelData.skillRanks.current, levelData.skillRanks.previous)
    levelData.skillRanks.nAvailable.current = getAvailableSkillRanks({
        classId: levelData.class,
        nLevel,
        raceData: levelData.raceData,
        modifiers: levelData.modifiers,
    })
    levelData.skillRanks.nAvailable.added = levelData.skillRanks.nAvailable.previous + levelData.skillRanks.nAvailable.current

    levelData.skillPoints.current = convertSkillRanksToPoints({
        ranks: levelData.skillRanks.added,
        classSkills: levelData.classSkills,
    })          
    levelData.skillPoints.added = levelData.skillPoints.previous + levelData.skillPoints.current

    
    levelData.maxKnownLanguages = getMaxKnownLanguages({
        modifiers: levelData.modifiers,
        raceData: levelData.raceData,
        skills: levelData.skills,
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