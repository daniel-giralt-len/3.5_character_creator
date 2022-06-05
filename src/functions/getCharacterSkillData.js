import classStats from '../db/json/itemData/classStats.json'
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const getCharacterSkillData = (classes = [], modifiers = {}, race) => {
    const out = classes
        .map(id=>({id, ...classStats[id]}))
        .reduce((acc, c, i) => {
            let skillPointData = c['skill points']
            if(!skillPointData){
                console.warn('no skill point data for class', c.id, c.name)
                skillPointData = {}
            }
            let levelScore = skillPointData.base + modifiers[skillPointData.score]
            if(race.name === 'human') levelScore += 1
            levelScore = Math.max(levelScore, 0)
            if(i===0) levelScore *= 4

            return {
                skills: [...(acc.skills||[]), ...c['class skills']||[]], 
                points: (acc.points||0) + levelScore
            }
        }, {})
    out.skills = (out.skills||[]).filter(onlyUnique)
    return out
}
export default getCharacterSkillData

