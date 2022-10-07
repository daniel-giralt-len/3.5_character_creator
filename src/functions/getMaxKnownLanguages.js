const getMaxKnownLanguages = ({modifiers, raceData, skillPoints}) => {
    const speakLanguageSkillId = 71
    return (raceData['automatic languages']||[]).length + Math.max(modifiers.INT || 0, 0) + ((skillPoints[speakLanguageSkillId]||{}).nRanks || 0)
}
export default getMaxKnownLanguages