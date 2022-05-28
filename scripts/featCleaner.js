const fs = require('fs')
//oh god.

const a = 1;
const jsonDescPath = './src/db/json/itemData/featDescription.json'
const jsonStatsPath = './src/db/json/itemData/featStats.json'

if(a===0){ //clean all feats the heck up from the get go, the htmls are like 45MB on disk and if I just dump them into a single JSON i might as well offer my CPU to Hephaestus
    const json = []
    const contentRegex = RegExp(/<div id="content">(.*)<\/div><div>/g)
    for(let i=1; i<=3609; i++){
        try{
            const path = `./src/db/html/feats/${i}.html`
            const html = fs.readFileSync(path).toString().replace(/\n/g,'').replace(/\r/g,'')
            json.push({
                id: i,
                html: (html.match(contentRegex) || [])[0]
            })
    
        }catch(e){console.error(i,e.message)}
    }
    fs.writeFileSync(jsonDescPath, JSON.stringify(json,null,2))
}

if(a===1){
    const json = require('.'+jsonDescPath)
    const isSkillTrickRegex = RegExp(/skill trick/i)
    const newJson = json.reduce((acc, {id, html}) => {
        return {
            ...acc,
            [id]: {
                isSkillTrick: isSkillTrickRegex.test(html)
            }
        }
    },{})
    fs.writeFileSync(jsonStatsPath, JSON.stringify(newJson,null,2))
}