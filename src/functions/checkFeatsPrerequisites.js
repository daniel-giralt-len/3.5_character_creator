import featStats from '../db/json/itemData/featStats.json'
import casterTypes from '../db/json/castersList.json'

const checkClasses = (p,c) => {
    if(p.value === 'abjurer') { return c.classes.some(({name})=>name.includes('abjurer')) }
    //TODO generate a castersList that works with this
    if(p.value === 'arcane caster') { return casterTypes.arcane.includes(p.value) }
    if(p.value === 'divine caster') { return casterTypes.divine.includes(p.value) }
    if(p.value === 'caster') { return [...casterTypes.arcane, ...casterTypes.divine].includes(p.value) }
    return c.classes.includes(p.id)
}

const prerequisiteChecks = {
    races: (p, c) => false,
    feats: (p, c) => c.feats.includes(p.id),
    skills: (p, c) => false,
    score: (p, c) => false,
    bab: (p, c) => false,
    level: (p, c) => false,
    language: (p, c) => false,
    classes: checkClasses,
    spellcasting: (p, c) => false,
    alignment: (p, c) => false,
    saveBaseBonus: (p, c) => false,
    classAbility: (p, c) => false,
    size: (p, c) => false,
    deities: (p, c) => false,
    creatureType: (p, c) => false,
    oneOf: (p, c) =>false
}

const isPrerequisiteFullfilled = (p, character) => {
    if(typeof p === 'string'){
        return {
            type: 'unknown',
            value: p,
            fullfilled: 'unknown'
        }
    }
    const out = {...p}
    if(!Object.keys(prerequisiteChecks).includes(out.type)){
        console.error('unknown type for prerequisite', out)
        out.fullfilled = 'unknown'
        return out
    }
    out.fullfilled = prerequisiteChecks[out.type](p, character)
    return out
}

const checkFeatsPrerequisites = (character) => {
    const queriableCharacter = {
        ...character,
        feats: Object
            .entries(character.feats)
            .filter(([_,v])=>v)
            .map(([k])=>k)
    }
    const out = queriableCharacter.feats
        .map(id=>({id,...featStats[id]}))
        .map(({prerequisites, ...rest}) => ({
            ...rest,
            prerequisites: prerequisites.map(p => isPrerequisiteFullfilled(p, queriableCharacter))
        }))
    console.log(out)
    return out
}

export default checkFeatsPrerequisites