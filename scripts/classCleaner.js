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

if(a===0){ // figure out some sections
    const json = require('.'+jsonPath)
    const onlyUnique = (value, index, self) => self.indexOf(value) === index;
    const headerRegex = RegExp(/<h[0-9]>(.*?)<\/h[0-9]>/g)
    const sectionNames = Object
        .values(json)
        .map(v=>v.html)
        .reduce((acc,html) => {
            return [
                ...acc,
                ...(
                    html
                        .match(headerRegex)
                        .map(l => (headerRegex.exec(l) || ['',''])[1].toLowerCase())
                ||[])
            ]
        },[])
        .filter(onlyUnique)
    
    fs.writeFileSync('./src/db/json/itemData/classSections.json', JSON.stringify(sectionNames,null,2))  
}
