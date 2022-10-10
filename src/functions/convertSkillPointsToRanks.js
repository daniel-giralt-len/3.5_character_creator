const rankToPoints = (n, isClassSkill) => isClassSkill ? n : n/2

const convertSkillPointsToRanks = ({ranks, classSkills}) =>  Object
    .entries(ranks)
    .reduce((acc, [id, nRanks]) => ({
        ...acc,
        [id]: rankToPoints(nRanks, classSkills.includes(id))
    }), {})

export default convertSkillPointsToRanks