import classStats from '../db/json/itemData/classStats.json'

const calculateMaxFeats = ({raceData = {}, classes = []}) => {
    let nFeats = 0
    
    const featsByLevel = [0,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,7]
    console.log(featsByLevel[classes.length])
    nFeats += featsByLevel[classes.length]
    
    nFeats += raceData['bonus feats'] || 0
    
    const levelsInEveryClass = {}
    classes.forEach(id => {
        levelsInEveryClass[id] = (levelsInEveryClass[id] || 0) + 1
        const advancement = (classStats[id].advancement.find(a=>a.level === levelsInEveryClass[id]) || {})
        if(advancement.special.includes('bonus feat')) nFeats += 1
    })

    return nFeats
}

export default calculateMaxFeats