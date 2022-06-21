const getMaxKnownLanguages = ({modifiers, raceData, skills}) => {
    const speakLanguageSkillId = 71
    return (raceData['automatic languages']||[]).length + 1 /*common*/ + Math.max(modifiers.INT || 0, 0) + ((skills[speakLanguageSkillId]||{}).nRanks || 0)
}
export default getMaxKnownLanguages