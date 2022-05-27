const fs = require('fs')

const jsonPath = './src/db/json/itemData/classDescription.json'

const a = 0

if(a===0){ //unify all htmls into one dirty json
    const json = []
    for(let i=1; i<=990; i++){
        try{
            const path = `./src/db/html/classes/${i}.html`
            const html = fs.readFileSync(path).toString()//.replace(/\n\r?/g,'')
            json.push({
                id: i,
                html
            })
    
        }catch(e){console.error(e,i)}
    }
    fs.writeFileSync(jsonPath, JSON.stringify(json,null,2))
}
