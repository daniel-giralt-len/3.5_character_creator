const fs = require('fs')
const dbs = require('../src/db/json/dbs.json')

const csvToJson = path => {
    const raw = fs.readFileSync(path)
    let lines = raw.toString().split('\n').filter(v=>v!=='')
    return lines.map(l => l.split(','))
}

for(let i=1; i<=35; i++){
    try{
        const json = csvToJson(`./src/db/html/language/${i}.csv`)
        //race, book, edition
        
    }catch(e){console.error('could not read language',i)}
}