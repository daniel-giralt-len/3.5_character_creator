const fs = require('fs')
const dbs = require('../db/json/dbs.json')
const invertedIndices = require('../db/json/invertedIndices.json')

if(true){
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

fs.writeFileSync('./db/json/dbs.json', JSON.stringify(dbs,null, 2))
