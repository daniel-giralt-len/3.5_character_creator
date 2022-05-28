const fs = require('fs')
const csvToJson = require('./csvToJson')

const a = 0;
const inPath = './src/db/csv/skills.csv'
const outPath = './src/db/json/skills.json'

if(a===0){
    const json = csvToJson(inPath)
    fs.writeFileSync(outPath, JSON.stringify(json,null,2))
}
