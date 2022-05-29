const fs = require('fs')

const jsonPath = './src/db/json/itemData/classDescription.json'
const classSectionsPath = './src/db/json/itemData/classSections.json'

const a = 6
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
        keys = keys.filter(k=>k&&k!=='')

        const includesSpellcasting = v => v.includes('Spellcasting') || v.includes('Spells') || v.includes('Infusions') || v.includes('Meldshaping') || v.includes('Utterances') 

        if(keys.includes('Flurry') || keys.find(k=>k.includes('Table'))){ 
            [keys, ...rows] = rows
        }
        if(keys && rows[0] && keys.length < rows[0].length){
            let spellKeys
            [spellKeys, ...rows] = rows
            keys = [...keys.filter(k=>!includesSpellcasting(k)), ...spellKeys]
        }
        keys = keys.map(k=>k.toLowerCase())

        const keySubstitutions = {
            'class level': 'level',
            'base attack bonus': 'bab',
            'ref save': 'ref',
            'will save': 'will',
            'fort save': 'fort',
            'reflex save': 'ref',
        }

        const keyedLevels = rows.reduce((acc, row) => {
            return [
                ...acc,
                row.reduce((acc2, cell, i) => {
                    let key = keys[i]
                    const value = key === 'special' ? cell.split(',').map(v=>v.trim()) : cell
                    if(keySubstitutions[key]) key=keySubstitutions[key]
                    
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
    
    const statsJson = newJson.map(({html,...rest})=>rest)
    fs.writeFileSync('./src/db/json/itemData/classStats.json', JSON.stringify(statsJson,null,2)) 
}

if(a===3){ // parse ints
    const classStatsPath = './src/db/json/itemData/classStats.json'
    const json = require('.'+classStatsPath)
    
    const parse = v => {
        const t = typeof v
        
        if(Array.isArray(v)) { return v.map(parse) }
        if(t === 'object') {
            return Object.entries(v)
                .reduce((acc, [k,v2])=>({
                    ...acc,
                    [k]: parse(v2)
                }),{})
        }
        if(t === 'string'){
            let match

            const babRegex = RegExp(/\+?([0-9]+)(?:\/\+[0-9]+)+$/)
            match = babRegex.exec(v)
            if(match) { return parseInt(match[1]) }

            const numberRegex = RegExp(/\+?([0-9]+)$/)
            match = numberRegex.exec(v)
            if(match) { return parseInt(match[1]) }

            const levelRegex = RegExp(/([0-9]+)(?:st|nd|rd|th)$/)
            match = levelRegex.exec(v)
            if(match) { return parseInt(match[1]) }
        }

        return v
    }

    const newJson = parse(json)
    
    fs.writeFileSync(classStatsPath, JSON.stringify(newJson,null,2))  
}

const classStatsPath = './src/db/json/itemData/classStats.json'
if(a===4){ // parse anchors, skill points, hyphens
    const json = require('.'+classStatsPath)
    
    const parse = (v, k=null) => {
        const t = typeof v
        
        if(Array.isArray(v)) { return v.map(parse) }
        if(t === 'object') {
            return Object.entries(v)
                .reduce((acc, [k,v2])=>({
                    ...acc,
                    [k]: parse(v2, k)
                }),{})
        }
        if(t === 'string'){
            if(k==='skill points'){
                const [a,b] = v.split(' + ')
                return {base: parseInt(a), score: b.toUpperCase()}
            }
            if(v[0]==='<'){
                const anchorRegex = new RegExp(/<a(?:.*?)>(.*?)<\/a>/g)
                const arr = regexToArray(anchorRegex, v)
                if(arr.length > 0) { return arr }
            }
            if(v==='&#8212;'){ return '' }
        }

        return v
    }

    const newJson = parse(json)
    
    fs.writeFileSync('./test.json'&&classStatsPath, JSON.stringify(newJson,null,2))  
}

if(a===5){ // clean colons in keys
    const classStatsPath = './src/db/json/itemData/classStats.json'
    const json = require('.'+classStatsPath)
    
    const parse = (v) => {
        const t = typeof v
        
        if(Array.isArray(v)) { return v.map(parse) }
        if(t === 'object') {
            return Object.entries(v)
            .reduce((acc, [k2,v2])=>{
                const k3 = k2[k2.length-1] === ':' ? k2.split(':')[0].trim() : k2
                return ({
                    ...acc,
                    [k3]: parse(v2)
                })
            },{})
        }

        return v
    }

    const newJson = parse(json)
    
    fs.writeFileSync('./test.json'&&classStatsPath, JSON.stringify(newJson,null,2))  
}

if(a===6){
    const json = require('.'+classStatsPath)
    const parsers = require('./classRequirementsParsers.js')
    //const dbs = require('../src/db/json/dbs.json')
    //const findItem = (list,n) => list.find(({name}) => name.toLowerCase() === n.toLowerCase())
    //const scores = ['STR','DEX','CON','INT','WIS','CHA']
    //const lists = ['classes','feats','language','races','skills']
    
    //const missing = []
    const parseRequirements = (k,v) => {
        const s = parsers.find(([kkk])=>kkk===k)
        if(s&&s[1]&&typeof s[1] === 'function'){
            return s[1](v)
        }

        return [k,v]
    }

    const newJson = json
        .reduce((acc, {id, ...classData}) => {
            return({
            ...acc,
            [id]: {
                ...classData,
                requirements: Object
                    .entries(classData.requirements || {})
                    .reduce((acc, [k,v])=> {
                        k = k.toLowerCase()
                        const [kk, vv] = parseRequirements(k,v)
                        return({
                            ...acc,
                            [kk]: vv
                        })
                }, {})
            }
        })}, {}
    )
    //console.log(missing)
    //const mS = missing.filter(([k],i,a) => onlyUnique(k,i,a.map(([k])=>k)))
    fs.writeFileSync(classStatsPath, JSON.stringify(newJson,null,2))
    //fs.writeFileSync(classStatsPath, JSON.stringify(newJson,null,2))
}