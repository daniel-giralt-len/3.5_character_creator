const rankToPoints = (n, isClassSkill) => isClassSkill ? n : n/2

const convertSkillPointsToRanks = ({ranks, classSkills}) =>  Object
    .entries(ranks)
    .reduce((acc, [name, nRanks]) => ({
        ...acc,
        [name]: rankToPoints(nRanks, classSkills[name])
    }), {})

export default convertSkillPointsToRanks