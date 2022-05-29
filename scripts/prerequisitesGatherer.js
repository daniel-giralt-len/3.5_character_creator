const fs = require('fs')
const path = './src/db/json/itemData/featStats.json'
const featStats = require('.'+path)
const classStats = require('../src/db/json/itemData/classStats.json')


const newJson = Object.values(featStats)
    .reduce((acc,feat) => {
        if(!feat.prerequisites) return acc
        feat.prerequisites
            .filter(p=>typeof p !== 'object')
            .forEach(p=>{
                acc[p] = acc[p] || []
                acc[p].push(feat.name)
            })
        return acc
    },{})

fs.writeFileSync('./scripts/missingFeatReqs.json', JSON.stringify(newJson, null, 1))


const newJson2 = Object.values(classStats)
    .reduce((acc,c) => {
        if(!c.requirements) return acc
        Object.values(c.requirements)
            .filter(p=>typeof p !== 'object')
            .forEach(p=>{
                acc[p] = acc[p] || []
                acc[p].push(c.name)
            })
        return acc
    },{})

fs.writeFileSync('./scripts/missingClassReqs.json', JSON.stringify(newJson2, null, 1))
