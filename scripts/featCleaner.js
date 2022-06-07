const fs = require('fs')
//oh god.

const a = 4;
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

    const listPrerequisites = html => {
        const prerequisiteRegex = RegExp(`<h[0-9]>Prerequisite.*?</h[0-9]><p>(.*?)</p>`,'i')
        return (
                (html.match(prerequisiteRegex) || [])[1] || ''
            )
            .split(/, ?/)
            .filter(v=>v&&v!=='')
            .map(p => {
                const anchorRegex = new RegExp(/<a(?:.*?)>(.*?)<\/a>/g)
                const match = anchorRegex.exec(p)
                if(!match){return p}
                return match[1]
            })

    }

    const newJson = json.reduce((acc, {id, html}) => {
        const benefitRegex = RegExp(`<h[0-9]>Benefit.*?</h[0-9]><p>(.*?)</p>`,'i')
        const specialRegex = RegExp(`<h[0-9]>Special.*?</h[0-9]><p>(.*?)</p>`,'i')
        return {
            ...acc,
            [id]: {
                isSkillTrick: isSkillTrickRegex.test(html),
                special: (html.match(specialRegex) || [])[1],
                benefit: (html.match(benefitRegex) || [])[1],
                prerequisites: listPrerequisites(html)
            }
        }
    },{})
    fs.writeFileSync(jsonStatsPath, JSON.stringify(newJson,null,2))
}


if(a===2){
    const json = require('.'+jsonStatsPath)
    const dbs = require('../src/db/json/dbs.json')
    const findItem = (list,n) => list.find(({name}) => name.toLowerCase() === n.toLowerCase())
    const scores = ['STR','DEX','CON','INT','WIS','CHA']
    const lists = ['classes','feats','language','races','skills']
    
    const parsePrerequisites = ps => {
        if(!ps) return 
        return ps.map(p=>{
            if(typeof p !=='string') return p

            const sp = p.toLowerCase()

            if(sp.includes('character level') && !sp.includes(' or ')){
                const a = p.split(' ')
                return {type: 'level', value: a[a.length-1]}
            }

            if(sp.includes('base attack bonus')){
                const [_, value] = p.split('+')
                return {type: 'bab', value: parseInt(value)}
            }

            let out = null
            scores.forEach(s => {
                if(p.toUpperCase().startsWith(s)){
                    const [_, value] = p.split(' ')
                    out = {type: 'score', score: s, value: parseInt(value)}
                }
            })
            lists.forEach(l => {
                const item = findItem(dbs[l], p)
                if(item){
                    out = {type: l, id: item.id}
                }
            })
            if(out){return out}

            console.error('item not found: ',p)
            return p
        })
    }

    const newJson = Object.entries(json)
        .reduce((acc, [id, feat]) => ({
            ...acc,
            [id]: {
                ...feat,
                prerequisites: parsePrerequisites(feat.prerequisites)
            }
        }),{})
    fs.writeFileSync(jsonStatsPath, JSON.stringify(newJson,null,2))
}

if(a===4){
    const json = require('.'+jsonDescPath)
    const stats = require('.'+jsonStatsPath)
    const skillz = require('../src/db/json/skills.json')
    const fixRanks = html => {
        const prerequisiteRegex = RegExp(`<h[0-9]>Prerequisite.*?</h[0-9]><p>(.*?)</p>`,'i')
        return (
                (html.match(prerequisiteRegex) || [])[1] || ''
            )
            .split(/, ?/)
            .filter(v=>v&&v!=='')
            .map(p => {
                const anchorRegex = new RegExp(/<a(?:.*?)>(.*?)<\/a>.*?([0-9]+) ranks/g)
                const match = anchorRegex.exec(p)
                if(!match){return}
                const name = match[1].toLowerCase(), rank = parseInt(match[2])
                console.log(name, rank)
                return {type: 'skill', id: skillz.find(s=>s.name===name).id, value: rank}
            }).filter(v=>v)

    }

    const newJson = json.reduce((acc, {id, html}) => {
        return {
            ...acc,
            [id]: {
                ...stats[id],
                prerequisites: [...fixRanks(html), ...stats[id].prerequisites]
            }
        }
    },{})
    fs.writeFileSync(jsonStatsPath, JSON.stringify(newJson,null,2))
}
