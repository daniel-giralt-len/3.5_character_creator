import classStats from '../db/json/itemData/classStats.json'
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const getClassSkills = (classesIds = []) => {
    return classesIds
        .map(id=>({id, ...classStats[id]}))
        .map(classData => classData['class skills'])
        .reduce((acc,list)=>([...acc, ...list]), [])
        .filter(onlyUnique)
        .sort() //not necessary but helps with debugging
}

export default getClassSkills

