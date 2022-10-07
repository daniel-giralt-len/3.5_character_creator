import classStats from '../db/json/itemData/classStats.json'
import onlyUnique from './filterOnlyUnique'

const getClassSkills = (classesIds = []) => {
    return classesIds
        .map(id=>({id, ...classStats[id]}))
        .map(classData => classData['class skills'])
        .reduce((acc,list)=>([...acc, ...list]), [])
        .filter(onlyUnique)
        .sort() //not necessary but helps with debugging
}

export default getClassSkills

