const fs = require('fs')
const csvToJson = require('./csvToJson')

const a = 1;
const inPath = './src/db/csv/skills.csv'
const outPath = './src/db/json/skills.json'
const dbPath = './src/db/json/dbs.json'

if(a===0){
    const json = csvToJson(inPath)
    fs.writeFileSync(outPath, JSON.stringify(json,null,2))
}

if(a===1){
    const json = require('.'+dbPath)
    json.skills = json.skills.map((j,id) => ({id: `${(id+1)}`, ...j}))
    fs.writeFileSync(dbPath, JSON.stringify(json,null,2))
}