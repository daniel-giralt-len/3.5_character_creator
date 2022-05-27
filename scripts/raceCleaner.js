//This is a bad name for a file.

const fs = require('fs')

const statsRegex = new RegExp('<table class="race-attributes">(.*?)</table>')
const descriptionRegex = new RegExp('<div class="nice-textile">(.*?)</div>')
const jsonPath = './src/db/json/itemData/raceDescription.json'

const a = 1

if(a===0){ //unify all htmls into one dirty json
    const json = {}
    for(let i=1; i<=42; i++){
        try{
            const path = `./src/db/html/races/${i}.html`
            const html = fs.readFileSync(path).toString().replace(/\n\r?/g,'')
            json[i] = {
                statsTable: html.match(statsRegex)[1],
                description: html.match(descriptionRegex)[1],
            }
    
        }catch(e){console.error(e,i)}
    }
    fs.writeFileSync(jsonPath, JSON.stringify(json,null,2))
}

if(a===1){ //clean stats
    const json = require(`.${jsonPath}`)
    const newJson = Object
        .entries(json)
        .reduce((acc, [id, {statsTable, ...rest}]) => {
            const statRegex = RegExp(/<tr>(.*?)<\/tr>/g)
            const statNameRegex = RegExp(/<th>(.*?):?<\/th>/)
            const statValueRegex = RegExp(/<td>(.*?)<\/td>/)

            const stats = statsTable
                .match(statRegex)
                .reduce((acc2,s)=>(
                    {
                        ...acc2,
                        [statNameRegex.exec(s)[1]]: statValueRegex.exec(s)[1]
                    }),
                {})

            return {
                ...acc,
                [id]: {
                    ...rest,
                    ...stats
                }
            }
        },
        {}
    )
    fs.writeFileSync(jsonPath, JSON.stringify(newJson,null,2))
}