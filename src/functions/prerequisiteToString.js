import skillsDb from '../db/json/skills.json'
import featStats from '../db/json/itemData/featStats.json'
import raceStats from '../db/json/itemData/raceStats.json'
import findInDb from './findInDb.js'


const classesToString = (p,t) => {
    const notImplementedYet = `(${t('not implemented yet')})`
    const getName = id => t(findInDb('classes', id.toString()).name)

    if(p.value === 'abjurer') { return `${t('abjurer class prerequisite')} ${notImplementedYet}` }
    if(p.value === 'arcane caster') { return `${t('arcane caster prerequisite', undefined, {nLevels: p.level || 1})} ${notImplementedYet}` }
    if(p.value === 'divine caster') { return `${t('divine caster prerequisite', undefined, {nLevels: p.level || 1})} ${notImplementedYet}` }
    if(p.value === 'caster') { return `${t('caster prerequisite', undefined, {nLevels: p.level || 1})} ${notImplementedYet}` }
    if(Array.isArray(p.value)){
        return t('multiple class prerequisite', undefined, {
            classes: p.value.map(getName).join(', ')
        })
    }
    return t('single class prerequisite', undefined, {
        className: getName(p.id||p.value)
    })
}

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
    language: (p, t) => {
        const languageName = t(findInDb('language', p.id.toString()).name)
        return t('language prerequisites', undefined, {languageName})
    },
    classes: classesToString,
    // spellcasting: (p, t) => 'unimplemented',
    alignment: ({legality, goodness}, t) => {
        return [
            (!legality || legality === '*') ? t('any legality') : t('legality list prerequisite', undefined, { names: legality.map(t).join(', ')}),
            (!goodness || goodness === '*') ? t('any goodness') : t('goodness list prerequisite', undefined, { names: goodness.map(t).join(', ')}),
        ].join('; ')
    },
    saveBaseBonus: (p, t) => t('save base bonus prerequisites', undefined, {
        name: t(p.saveType),
        total: p.value,
    }),
    // classAbility: (p, t) => c.classAbilities.some(a=>a.toLowerCase().includes(p.value)),
    size: (p, t) => t('size prerequisites', undefined, {
        sizeList: p.value.map(v=>t(v,'sizes')).join(', ')
    }),
    deities: (p, t) => {
        const notImplementedYet = `(${t('not implemented yet')})`
        const msg = t('deities prerequisites', undefined, {
            deityName: t(p.value)
        })
        return `${msg} ${notImplementedYet}`
    },
    // creatureType: () => 'unknown',
    // oneOf: checkOneOf
}

const prerequisiteToString = (p, translate) => {
    if(typeof p === 'string'){
        const notImplementedYet = `(${translate('not implemented yet')})`
        console.warn('prerequisite is just a string', p)
        return `${translate(p)} ${notImplementedYet}`
    }
    if(!Object.keys(prerequisiteValidations).includes(p.type)){
        console.warn('unknown type for prerequisite', p)
        return
    }
    return prerequisiteValidations[p.type](p, translate)
}

export default prerequisiteToString