const fs = require('fs')
const dbs = require('../db/json/dbs.json')
const invertedIndices = require('../db/json/invertedIndices.json')

const s = 1

if(s===0){
    dbs.rulebooks = dbs.rulebooks.map(({edition, editionLink, ...rest}) => {
        if (!invertedIndices.editions[edition]){
            console.log('not found', edition, 'for', rest.name)
        }
        return {
            ...rest,
            edition: invertedIndices.editions[edition] || edition
        }
    })
}

if(s===1){
    dbs.races = dbs.races.map(({edition, editionLink, ...rest}) => {
        if (!invertedIndices.editions[edition]){
            console.log('not found', edition, 'for', rest.name)
        }
        return {
            ...rest,
            edition: invertedIndices.editions[edition] || edition
        }
    })
}

fs.writeFileSync('./db/json/dbs.json', JSON.stringify(dbs,null, 2))
