//This is a bad name for a file.

const fs = require('fs')

const statsRegex = new RegExp('<table class="race-attributes">(.*?)</table>')
const descriptionRegex = new RegExp('<div class="nice-textile">(.*?)</div>')
const jsonPath = './src/db/json/itemData/raceDescription.json'

const a = 2

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

if(a===1){ //key stats
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

if(a===2){ //parse stats
    const json = require(`.${jsonPath}`)

    const parseNumber = n => parseInt(n.replace('&minus;', '-'))
    const parseLength = n => parseInt(n.replace('feet', ''))
    const parseAnchors = s => {
        const r = new RegExp(/<a href="(?:.*?)">(.*?)<\/a>/g)
        let links = []
        let match
        while ((match = r.exec(s)) !== null) { links.push(match[1]) }
        return links
    }

    const parser = {
        'description': {key: 'description', parse: s=>s },
        'Size': {key: 'size', parse: s => s.toLowerCase() },
        'Base speed': {key: 'base speed', parse: s=>s },
        'Strength': {key: 'STR', parse: parseNumber },
        'Dexterity': {key: 'DEX', parse: parseNumber },
        'Constitution': {key: 'CON', parse: parseNumber },
        'Intelligence': {key: 'INT', parse: parseNumber },
        'Wisdom': {key: 'WIS', parse: parseNumber },
        'Charisma': {key: 'CHA', parse: parseNumber },
        'Reach': {key: 'reach', parse: parseLength },
        'Bonus Languages': {key: 'bonus languages', parse: parseAnchors },
        'Racial Base Attack': {key: 'racial base attack', parse: parseNumber },
        'Racial Base Saves': {key: 'racial base saves', parse: s => {
            const r = RegExp(/Fort (\+[0-9]+),Reflex (\+[0-9]+),Will (\+[0-9]+)/)
            const [ _ , fortitude, reflex, will] = r.exec(s)
            return { fortitude, reflex, will }
        } },
        'Natural armor': {key: 'natural armor', parse: parseNumber },
    }  

    const newJson = Object
        .entries(json)
        .reduce((acc, [id, o]) => {
            console.log(id)
            const newO = Object
                .entries(o)
                .reduce((acc2, [name, value]) => {
                    console.log(name)
                    return {
                        ...acc2,
                        [parser[name].key]: parser[name].parse(value)
                    }
                },
                {}
            )

            newO.description = o.description

            return {
                ...acc,
                [id]: newO
            }
        }, {})

    
    fs.writeFileSync(jsonPath, JSON.stringify(newJson,null,2))
}