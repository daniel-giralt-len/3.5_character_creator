import webTranslations from '../db/json/translations/webTranslations.json'
import raceTranslations from '../db/json/translations/races.json'
import editionTranslations from '../db/json/translations/editions.json'
import rulebookTranslations from '../db/json/translations/rulebooks.json'
import featTranslations from '../db/json/translations/feats.json'
import classeTranslations from '../db/json/translations/classes.json'

const itemTranslations = {
    races: raceTranslations,
    editions: editionTranslations,
    rulebooks: rulebookTranslations,
    feats: featTranslations,
    classes: classeTranslations,
}

const getTranslator = (language = 'en') => {
    const translate = (strIn, itemType) => {
        const translations = itemTranslations[itemType] ||webTranslations[language]
        const str = strIn.toLowerCase()
        return ((translations && translations[str]) || (webTranslations['*'] && webTranslations['*'][str]) || strIn)
    }
    return translate
}

export default getTranslator