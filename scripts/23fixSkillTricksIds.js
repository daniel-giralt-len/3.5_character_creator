const fs = require('fs')

const skilltrickPath = '../src/db/json/itemData/skilltrickStats.json'
const skilltricks = require(skilltrickPath)

const newSkillTricks = Object.values(skilltricks).reduce((acc, st, index)=>({...acc, [index+1]: st}), {})

fs.writeFileSync(skilltrickPath, JSON.stringify(newSkillTricks, null, 2))
