const getModifiersFromScores = (scores, bonuses) => Object.keys(scores).reduce((acc,id)=>({...acc, [id]: Math.floor(((scores[id] || 0) + (bonuses[id] || 0) - 10)/2)}),{})

export default getModifiersFromScores