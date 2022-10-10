import classStats from '../../db/json/itemData/classStats.json'

const getLevelClassSkills = (classId) => {
    return (classStats[classId]||{})['class skills'] || []
        .sort() //not necessary but helps with debugging
}

export default getLevelClassSkills

