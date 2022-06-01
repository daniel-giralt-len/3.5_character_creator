import classStats from '../db/json/itemData/classStats.json'
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const getCharacterClassData = (classes = [], scores = {}, race) => {
    const out = classes
        .map(id=>classStats[id])
        .reduce((acc, c, i) => {
            let levelScore = c['skill points'].base + scores[c['skill points'].score]
            if(race.name === 'human') levelScore += 1
            if(i===0) levelScore *= 4
            return ({
                ...acc,
                skills: [...(acc.skills||[]), ...c['class skills']], 
                points: (acc.points||0) + levelScore
            })
        }, {})
    out.skills = out.skills.filter(onlyUnique)
    return out
}
export default getCharacterClassData
