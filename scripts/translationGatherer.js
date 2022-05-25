const dbs = require('../src/db/json/dbs')

const items = [
    'rulebooks',
    'classes',
    'races',
    'feats',
]

const out = items
    .reduce((acc, type)=>{
        const translatables = dbs[type].map(({id, name}) => `${name},,${id},${type}`)
        return [
            ...acc,
            ...translatables,
        ]
    }, ['name,spanishName,id,type'])
    .join('\n')

require('fs').writeFileSync('./src/db/csv/translatables.csv', out)