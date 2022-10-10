import classStats from '../../db/json/itemData/classStats.json'

const getClassSkills = (classId) => {
    return (classStats[classId]||{})['class skills'] || []
        .sort() //not necessary but helps with debugging
}

export default getClassSkills

