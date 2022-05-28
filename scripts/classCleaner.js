const fs = require('fs')

const jsonPath = './src/db/json/itemData/classDescription.json'
const classSectionsPath = './src/db/json/itemData/classSections.json'

const a = 2
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const regexToArray = (r,s) => {
    const out = []
    let match
    while ((match = r.exec(s)) !== null) { out.push(match[1]) }
    return out
}

const stripHtmlTags = s => s.replace(/<\/?[^>]+(>|$)/g, "").trim()

const tableToJson = html => {
    const rowsRegex = RegExp(/<tr.*?>(.*?)<\/tr>/g)
    const rows = regexToArray(rowsRegex, html)
    const cellRegex = RegExp(/<t.*?>(.*?)<\/t.>/g)
    const values = rows.map(row=>regexToArray(cellRegex, row).map(stripHtmlTags))
    return values
}

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
        const featuresRegex = RegExp(`<div class="nice-textile"><h[0-9]>${sectionTitle}(?:.*?)</h[0-9]>(.*?)</div>`,'i')
        const data = featuresRegex.exec(html)
        if(!data) return
        const paragraphRegex = RegExp(/<p><strong>(.*?):<\/strong> ?(.*?)<\/p>/g)
        let features = {}
        let match
        while ((match = paragraphRegex.exec(data)) !== null) {
            features[match[1].toLowerCase()] = match[2]
        }
        return features
    }

    const parseClassSkills = (html, sectionTitle) => {
        const skillsRegex = RegExp(`<h3>${sectionTitle}(?:.*?)<table .*?>(.*?)</table>`,'i')
            //<h3> only, since urban soul has another <h4>Class Skills</h4> tag that's out of order, and grabs a weird table instead of the class skills table
        const data = skillsRegex.exec(html)
        if(!data) return
        const skillNameRegex = RegExp(/<tr><td>(.*?)<\/td>(?:.*?)<\/tr>/g)
        let classSkills = []
        let match
        while ((match = skillNameRegex.exec(data)) !== null) {
            const anchorRegex = new RegExp(/<a(?:.*?)>(.*?)<\/a>/g)
            try{
                const name = anchorRegex.exec(match[1])[1]
                classSkills.push(name.toLowerCase())
            }catch(e){console.error(html)}
        }
        return classSkills.filter(onlyUnique) //for some reason the skill or anchor regex duplicates the class skills.
            //This is a comfier, sinier solution.
            //Listen bro, I'm crawling a 6yo page about ~17yo data. Cut me some slack.
            //No, I'm not on getting defensive.
    }

    const parseAdvancement = (html, sectionTitle) => {
        const advancementRegex = RegExp(`<h[0-9]>${sectionTitle}(?:.*?)<table.*?>(.*?)</table>`,'i')
        const data = advancementRegex.exec(html)
        if(!data) return
        const advancement = tableToJson(data[1])
        let keys, rows
        [keys, ...rows] = advancement
        keys = keys.filter(k=>k&&k!=='').map(k=>k.toLowerCase())

        const includesSpellcasting = v => v.includes('Spellcasting') || v.includes('Spells')

        if(keys.find(includesSpellcasting) && keys.length < rows[0].length){
            let spellKeys
            [spellKeys, ...rows] = rows
            keys = [...keys.filter(k=>!includesSpellcasting(k)), ...spellKeys]
        }
        const keyedLevels = rows.reduce((acc, row) => {
            return [
                ...acc,
                row.reduce((acc2, cell, i) => {
                    const key = keys[i]
                    const value = key === 'special' ? cell.split(',').map(v=>v.trim()) : cell
                    
                    return {
                        ...acc2,
                        [key]: value
                    }
                }, {})
            ]
        }, [])
        return keyedLevels
    }

    const sectionParsers = {
        'requirements': html => parseRequirements(html, 'requirements'),
        'skill points': html => parseParagraph(html, 'skill points'),
        'advancement': html => parseAdvancement(html, 'advancement'),
        'hit die': html => parseParagraph(html, 'hit die'),
        'starting gold': html => parseParagraph(html, 'starting gold'),
        'class features': html => parseClassFeatures(html, 'class features'),
        'class skills': html => parseClassSkills(html, 'class skills'),
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