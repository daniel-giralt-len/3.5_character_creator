const path = './src/db/json/skills.json'
const file = require('.'+path)
const fs = require('fs')

const newFile = file
    .map((o,i)=>({...o, id:i+1}))

fs.writeFileSync(path, JSON.stringify(newFile, null, 2))