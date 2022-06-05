import classStats from '../db/json/itemData/classStats.json'

const calculateCharacterBonuses = ({raceData = {}, classes = {}}) => {
    const baseSaves = raceData["racial base saves"] || {}
    const out = {
        STR: raceData.STR || 0,
        INT: raceData.INT || 0,
        DEX: raceData.DEX || 0,
        WIS: raceData.WIS || 0,
        CON: raceData.CON || 0,
        CHA: raceData.CHA || 0,
        bab: raceData["racial base attack"] || 0,
        fortitude: baseSaves.fortitude || 0,
        reflex: baseSaves.reflex || 0,
        will: baseSaves.will || 0,
    }
    
    const levelsInEveryClass = classes.reduce((acc,id)=>({...acc, [id]: (acc[id]||0)+1 }),{})

    Object.entries(levelsInEveryClass)
        .forEach(([id, level]) => {
            const advancementList = (classStats[id].advancement)
            if(!advancementList){
                console.warn('no advancements in class', id)
            }else{
                const advancement = advancementList.find(a=>a.level === level) || {}
                out.bab += (advancement.bab || 0)
                out.fortitude += (advancement.fort || 0)
                out.reflex += (advancement.ref || 0)
                out.will += (advancement.will || 0)
            }
        })

    return out
}

export default calculateCharacterBonuses