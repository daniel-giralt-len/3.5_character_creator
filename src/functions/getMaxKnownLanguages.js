const getMaxKnownLanguages = ({modifiers, raceData, skillRanks}) => {
    const speakLanguageSkillId = 71
    return  Math.max(modifiers.INT || 0, 0) +
            (skillRanks[speakLanguageSkillId] || 0)
}
export default getMaxKnownLanguages