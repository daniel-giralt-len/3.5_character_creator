const fs = require('fs')

const dbs = require('../src/db/json/dbs.json')
const raceStats = require('../src/db/json/itemData/raceStats.json')
const classStats = require('../src/db/json/itemData/classStats.json')
const featStats = require('../src/db/json/itemData/featStats.json')

const addExtraToStats = (db, stats) => {
    const newStats={...stats}
    db.forEach(({id, name, link, isPrestige, book, edition})=>{
        newStats[id] = {
            name,
            link,
            isPrestige,
            bookId: book,
            editionId: edition,
            ...newStats[id],
        }
    })
    return newStats;
}

const newRaceStats = addExtraToStats(dbs.races, raceStats)
fs.writeFileSync('./src/db/json/itemData/raceStats.json', JSON.stringify(newRaceStats, null, 2))
const newClassesStats = addExtraToStats(dbs.classes, classStats)
fs.writeFileSync('./src/db/json/itemData/classStats.json', JSON.stringify(newClassesStats, null, 2))
const newFeatStats = addExtraToStats(dbs.feats, featStats)
fs.writeFileSync('./src/db/json/itemData/featStats.json', JSON.stringify(newFeatStats, null, 2))
