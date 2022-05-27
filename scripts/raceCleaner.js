//This is a bad name for a file.

const fs = require('fs')

const statsRegex = new RegExp('<table class="race-attributes">(.*?)</table>')
const descriptionRegex = new RegExp('<div class="nice-textile">(.*?)</div>')

const a = 0

if(a===0){ //unify all htmls into one dirty json
    const json = {}
    for(let i=1; i<=42; i++){
        try{
            const path = `./src/db/html/races/${i}.html`
            let html = fs.readFileSync(path).toString().replace(/\n\r?/g,'')
            json[i] = {
                statsTable: html.match(statsRegex)[1],
                description: html.match(descriptionRegex)[1],
            }
    
        }catch(e){console.error(e,i)}
    }
    fs.writeFileSync('./src/db/json/itemData/raceDescription.json', JSON.stringify(json,null,2))
}
