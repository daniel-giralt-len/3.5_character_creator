const fs = require('fs')

const dbsPath = '../src/db/json/dbs.json'
const dbs = require(dbsPath)
const featsPath = '../src/db/json/itemData/featStats.json'
const feats = require(featsPath)
const skilltrickPath = '../src/db/json/itemData/skilltrickStats.json'

const skillTricksNames = dbs.skilltricks.map(s=>s.name)

const newFeats = Object.entries(feats)
    .reduce((acc,[id,feat])=>{
        if(skillTricksNames.includes(feat.name)){ return acc}
        return { ...acc, [id]: feat }
    },{})

const newSkillTricks = Object.entries(feats)
    .reduce((acc,[id,feat])=>{
        if(!skillTricksNames.includes(feat.name)){ return acc }
        return { ...acc, [id]: feat }
    },{})


fs.writeFileSync(featsPath, JSON.stringify(newFeats, null, 2))
fs.writeFileSync(skilltrickPath, JSON.stringify(newSkillTricks, null, 2))
