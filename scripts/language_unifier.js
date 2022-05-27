const fs = require('fs')

const languageToSpeakerPath = './src/db/csv/languageSpeakers.csv'

const a = 1

if(a===0){ //unify all csvs into one
    const csv = ['languageId,race,book,edition']
    for(let i=1; i<=35; i++){
        try{
            let lines = fs.readFileSync(`./src/db/html/language/${i}.csv`)
                .toString()
                .split('\n')
                .filter(v=>v!=='')
                .map(r=>r.replace(/\r/g,''))
                .map(v=>`${i},${v}`)
            csv.push(...lines)
    
        }catch(e){console.error(e,i)}
    }
    fs.writeFileSync(languageToSpeakerPath, csv.join('\n'))
}

if(a===1){ //relate all languages to its usual speakers of races
    const dbs = require('../src/db/json/dbs.json')
    const csvToJson = require('./csvToJson')

    const languageToSpeaker = csvToJson(languageToSpeakerPath)

    const languageToSpeakerIdMap = languageToSpeaker
        .map(({languageId, race, book, edition}) => {
            const bookId = dbs.rulebooks.find(({name})=>book===name).id
            const editionId = dbs.editions.find(({name})=>edition===name).id
            const raceId = dbs.races.find(({name, book, edition}) => name===race && book===bookId && editionId === edition).id
            if(!bookId){ console.error('no such book', book) }
            if(!editionId){ console.error('no such edition', edition) }
            if(!raceId){ console.error('no such race', race, bookId, editionId) }
            return {
                languageId,
                raceId
            }
        })
    fs.writeFileSync('./src/db/json/languageSpeakers.json', JSON.stringify(languageToSpeakerIdMap, null, 2))
    //console.log(languageToSpeakerIdMap)
}