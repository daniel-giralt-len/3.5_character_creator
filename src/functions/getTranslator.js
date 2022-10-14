import webTranslations from '../db/json/translations/webTranslations.json'
import raceTranslations from '../db/json/translations/races.json'
import editionTranslations from '../db/json/translations/editions.json'
import rulebookTranslations from '../db/json/translations/rulebooks.json'
import featTranslations from '../db/json/translations/feats.json'
import classeTranslations from '../db/json/translations/classes.json'
import skillTranslations from '../db/json/translations/skills.json'

const itemTranslations = {
    races: raceTranslations,
    editions: editionTranslations,
    rulebooks: rulebookTranslations,
    feats: featTranslations,
    classes: classeTranslations,
    skills: skillTranslations
}

const getTranslator = (language = 'en') => {
    const translate = (strIn, itemType, variablesToReplace = []) => {
        const translations = itemTranslations[itemType] ? itemTranslations[itemType][language] : webTranslations[language]
        const str = strIn.toLowerCase()
        const translatedStr = (
            (translations && translations[str]) 
            || (webTranslations['*'] && webTranslations['*'][str]) 
            || strIn
        )
        const strWithVariables = Object.entries(variablesToReplace)
            .reduce((str, [k,v]) => str.replace(`{${k}}`, v), translatedStr)
        return strWithVariables
    }
    return translate
}

export default getTranslator