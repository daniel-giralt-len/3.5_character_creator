import classStats from '../db/json/itemData/classStats.json'

const getCharacterClassAbilities = ({ classes = []}) => {
    const levelsInEveryClass = {}
    const classAbilities = classes.reduce((acc, id) => {
        levelsInEveryClass[id] = (levelsInEveryClass[id] || 0) + 1
        const advancementList = (classStats[id].advancement)
        if(!advancementList){
            console.warn('no advancements in class', id)
        }else{
            const advancement = (advancementList.find(a=>a.level === levelsInEveryClass[id]) || {})
            return [...acc, ...advancement.special]
        }
        return acc
    },[])

    return classAbilities
}

export default getCharacterClassAbilities