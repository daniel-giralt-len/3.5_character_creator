const fs = require('fs')

const jsonPath = './src/db/json/itemData/classDescription.json'
const classSectionsPath = './src/db/json/itemData/classSections.json'

const a = 2

if(a===0){ //unify all htmls into one dirty json
    const json = []
    for(let i=1; i<=990; i++){
        try{
            const path = `./src/db/html/classes/${i}.html`
            const html = fs.readFileSync(path).toString().replace(/\n/g,'').replace(/\r/g,'')
            json.push({
                id: i,
                html
            })
    
        }catch(e){console.error(e,i)}
    }
    fs.writeFileSync(jsonPath, JSON.stringify(json,null,2))
}

if(a===1){ // figure out some sections
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
    
    fs.writeFileSync(classSectionsPath, JSON.stringify(sectionNames,null,2))  
}

if(a===2){ //get sections
    const parseParagraph = (html, sectionTitle) => {
        const paragraphRegex = RegExp(`<h[0-9]>${sectionTitle}(?:.*?)</h[0-9]><p>(.*?)</p>`,'i')
        const data = (paragraphRegex.exec(html) || [])[1]
        return data
    }

    const parseRequirements = (html, sectionTitle) => {
        const reqListRegex = RegExp(`<h[0-9]>${sectionTitle}(?:.*?)</h[0-9]><div(?:.*?)>(.*?)</div>`,'i')
        const data = reqListRegex.exec(html)
        if(!data) return
        const paragraphRegex = RegExp(/<p><strong>(.*?)<\/strong> ?(.*?)<\/p>/g)
        let requirements = {}
        let match
        while ((match = paragraphRegex.exec(data)) !== null) {
            requirements[match[1].toLowerCase()] = match[2]
        }
        return requirements
    }

    const parseClassFeatures = (html, sectionTitle) => {
        const skillsRegex = RegExp(`<div class="nice-textile"><h[0-9]>${sectionTitle}(?:.*?)</h[0-9]>(.*?)</div>`,'i')
        const data = skillsRegex.exec(html)
        if(!data) return
        const paragraphRegex = RegExp(/<p><strong>(.*?):<\/strong> ?(.*?)<\/p>/g)
        let skills = {}
        let match
        while ((match = paragraphRegex.exec(data)) !== null) {
            skills[match[1].toLowerCase()] = match[2]
        }
        return skills
    }
    const sectionParsers = {
        'requirements': html => parseRequirements(html, 'requirements'),
        'skill points': html => parseParagraph(html, 'skill points'),
        'advancement': html => {return undefined},
        'hit die': html => parseParagraph(html, 'hit die'),
        'starting gold': html => parseParagraph(html, 'starting gold'),
        'class features': html => parseClassFeatures(html, 'class features'),
        'class skills': html => {return undefined},
        'alignment': html => parseParagraph(html, 'alignment'),
        '<span class="caps">class</span> <span class="caps">skills</span>': html => {return undefined},
        'signature weapons': html => {return undefined},
    }
    const json = require('.'+jsonPath)
    const newJson = json
        .map(({id, html}) => {
            const oneLineHtml = html.replace(/\n/,'').replace(/\r/,'')
            return Object
                .entries(sectionParsers)
                .reduce((acc2, [key, parse]) => {
                    return {
                        ...acc2,
                        [key]: parse(oneLineHtml)
                    }
                },
                {id, html})
            })
    fs.writeFileSync(jsonPath, JSON.stringify(newJson,null,2))  
}