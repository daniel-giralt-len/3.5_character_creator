import classStats from '../db/json/itemData/classStats.json'

const getAvailableSkillPoints = ({classId, nLevel, modifiers = {}, raceData = ''}) => {
    if(!classId) return 0
    const classData = classStats[classId]
    const skillPointData = classData['skill points']
    if(!skillPointData){
        console.warn('no skill point data for class', classData.id, classData.name)
        return 0
    }

    let levelRanks = skillPointData.base + modifiers[skillPointData.score]
    if(raceData.name.toLowerCase() === 'human') levelRanks += 1
    if(nLevel === 1) levelRanks *= 4
    levelRanks = Math.max(levelRanks, 0) //even if INT is negative, there cannot be negative ranks

    return levelRanks
}
export default getAvailableSkillPoints

