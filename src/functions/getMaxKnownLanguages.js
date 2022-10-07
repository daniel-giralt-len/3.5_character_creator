const getMaxKnownLanguages = ({modifiers, raceData, skillRanks}) => {
    const speakLanguageSkillId = 71
    return  (raceData['automatic languages'] || []).length +
            Math.max(modifiers.INT || 0, 0) +
            (skillRanks[speakLanguageSkillId] || 0)
}
export default getMaxKnownLanguages