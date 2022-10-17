import skillsDb from '../db/json/skills.json'
import featStats from '../db/json/itemData/featStats.json'
import raceStats from '../db/json/itemData/raceStats.json'

const prerequisiteValidations = {
    races: (p, t) => t('race prerequisites', undefined, {
        raceName: t(raceStats[p.id].name, 'feats'),
    }),
    feats: (p, t) => t('feat prerequisites', undefined, {
        featName: t(featStats[p.id].name, 'feats'),
    }),
    skills: (p, t) => {
        const stats = skillsDb.find(({id})=>id===p.id)
        return t('skills prerequisites', undefined, {
            skillName: t(stats.name, 'skills'),
            nRanks: p.value,
        })
    },
    score: (p, t) => t('score prerequisites', undefined, {
        type: t(p.score),
        total: p.value,
    }),
    bab: (p, t) => t('bab prerequisites', undefined, {
        bab: p.value,
    }),
    level: (p, t) => t('level prerequisites', undefined, {
        nLevel: p.value
    }),
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