import casterTypes from '../db/json/castersList.json'

const checkClasses = (p,c) => {
    if(p.value === 'abjurer') { return c.classes.some(({name})=>name.includes('abjurer')) }
    //TODO generate a castersList that works with this
    if(p.value === 'arcane caster') { return casterTypes.arcane.includes(p.value) }
    if(p.value === 'divine caster') { return casterTypes.divine.includes(p.value) }
    if(p.value === 'caster') { return [...casterTypes.arcane, ...casterTypes.divine].includes(p.value) }
    return c.classes.includes(p.id)
}

const checkAlignments = ({legality, goodness},c) => {
    return (legality === '*' || legality.includes(c.alignment.legality)) && (goodness === '*' || goodness.includes(c.alignment.goodness))    
}

const checkSaves = (p, c) => {
    const saveToModifier = {fortitude: 'CON', reflex: 'DEX', will: 'WIS'}
    return (c.bonuses[p.saveType] + c.modifiers[saveToModifier[p.saveType]]) >= p.value
}

const checkOneOf = (p, c) => p.choices.some(pi => isPrerequisiteFullfilled(pi, c).fullfilled === true)

const prerequisiteValidations = {
    // races: (p, c) => c.races === p.id,
    // feats: (p, c) => c.feats.includes(p.id),
    skills: (p, c) => c.skillRanks.added[p.id] && (c.skillRanks.added[p.id]) >= (p.value || 0),
    // score: (p, c) => (c.bonuses[p.score] + c.scores[p.score]) >= p.value,
    // bab: (p, c) => c.bonuses.bab >= p.value,
    // level: (p, c) => c.classes.length >= p.value,
    // language: (p, c) => c.language[p.id] === true,
    // classes: checkClasses,
    // spellcasting: (p, c) => 'unimplemented',
    // alignment: checkAlignments,
    // saveBaseBonus: checkSaves,
    // classAbility: (p, c) => c.classAbilities.some(a=>a.toLowerCase().includes(p.value)),
    // size: (p, c) => Array.isArray(p.value) ? p.value.includes(c.raceData.size) : p.value === c.raceData.size,
    // deities: () => 'unknown',
    // creatureType: () => 'unknown',
    // oneOf: checkOneOf
}

const isPrerequisiteFullfilled = (p, levelData) => {
    if(typeof p === 'string'){
        console.warn('prerequisite is just a string', p)
        return true
    }
    if(!Object.keys(prerequisiteValidations).includes(p.type)){
        console.warn('unknown type for prerequisite', p)
        return true
    }
    return prerequisiteValidations[p.type](p, levelData)
}

const filterUnfulfilledPrerequisites = (prerequisites, fullLevelData) => prerequisites
    .filter(prerequisite => !isPrerequisiteFullfilled(prerequisite, fullLevelData))

export default filterUnfulfilledPrerequisites