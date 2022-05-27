const fs = require('fs')

const finalJson={}
for(let i=1; i < 108; i++){
    const path = `../src/db/html/rulebooks/${i}.json`
    try{   
        finalJson[i] = require(path)
    }catch(e){console.error('could not read', path)}
}

fs.writeFileSync('./src/db/json/rulebooks_data.json', JSON.stringify(finalJson, null, 2))