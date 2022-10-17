import skillsDb from "../db/json/skills.json";

const prerequisiteValidations = {
    // races: (p, t) => c.races === p.id,
    //feats: (p, t) => c.feats && c.feats[p.id],
    skills: (p, t) => {
        const stats = skillsDb.find(({id})=>id===p.id)
        return t('skills prerequisites', undefined, {
            skillName: t(stats.name, 'skills'),
            nRanks: p.value,
        })
    },
    // score: (p, t) => (c.bonuses[p.score] + c.scores[p.score]) >= p.value,
    // bab: (p, t) => c.bonuses.bab >= p.value,
    // level: (p, t) => c.classes.length >= p.value,
    // language: (p, t) => c.language[p.id] === true,
    // classes: checkClasses,
    // spellcasting: (p, t) => 'unimplemented',
    // alignment: checkAlignments,
    // saveBaseBonus: checkSaves,
    // classAbility: (p, t) => c.classAbilities.some(a=>a.toLowerCase().includes(p.value)),
    size: (p, t) => t('size prerequisites', undefined, {
        sizeList: p.value.map(v=>t(v,'sizes')).join(', ')
    })
    // deities: () => 'unknown',
    // creatureType: () => 'unknown',
    // oneOf: checkOneOf
}

const prerequisiteToString = (p, translate) => {
    if(typeof p === 'string'){
        console.warn('prerequisite is just a string', p)
        return p
    }
    if(!Object.keys(prerequisiteValidations).includes(p.type)){
        console.warn('unknown type for prerequisite', p)
        return
    }
    return prerequisiteValidations[p.type](p, translate)
}

export default prerequisiteToString