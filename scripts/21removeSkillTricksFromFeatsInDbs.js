const fs = require('fs')

const dbsPath = '../src/db/json/dbs.json'
const dbs = require(dbsPath)

const newDbs = {...dbs}
const skillTricks = dbs.skilltricks
const skillTricksNames = skillTricks.map(s=>s.name)
newDbs.feats = dbs.feats.filter(({name}) => !skillTricksNames.includes(name))

fs.writeFileSync(dbsPath, JSON.stringify(newDbs, null, 2))
