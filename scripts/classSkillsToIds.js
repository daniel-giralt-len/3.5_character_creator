const skills = require('../src/db/json/skills.json')
const classes = require('../src/db/json/itemData/classStats.json')
const fs = require('fs')

const out = Object.entries(classes)
    .reduce((acc,[id,c]) => ({
        ...acc,
        [id]: {
            ...c,
            "class skills": (c["class skills"]||[])
                .map(s=> skills.find(({name})=>s===name).id)
        }
    }))

fs.writeFileSync('./src/db/json/itemData/classStats.json', JSON.stringify(out,null,2))