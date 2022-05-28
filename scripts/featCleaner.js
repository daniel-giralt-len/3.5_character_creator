//oh god.

const a = 0;
const jsonPath = './src/db/json/itemData/featDescription.json'

if(a===0){ //clean all feats the heck up from the get go, the htmls are like 45MB on disk and if I just dump them into a single JSON i might as well offer my CPU to Hephaestus
    const fs = require('fs')
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
    fs.writeFileSync(jsonPath, JSON.stringify(json,null,2))
}