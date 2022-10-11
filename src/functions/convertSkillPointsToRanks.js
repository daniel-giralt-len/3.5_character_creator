const pointsToRanks = (n, isClassSkill) => isClassSkill ? n : n/2

const convertSkillPointsToRanks = ({ranks, classSkills}) =>  Object
    .entries(ranks)
    .reduce((acc, [id, nPoints]) => ({
        ...acc,
        [id]: pointsToRanks(nPoints, classSkills.includes(parseInt(id)))
    }), {})

export default convertSkillPointsToRanks