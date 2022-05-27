const fs = require('fs')

const delimiter = ','

const csvToJson = path => {
    const raw = fs.readFileSync(path)
    let lines = raw.toString().split('\n')
    const [header, ...values] = lines
    const keys = header.split(delimiter)
    return values.map(l => l.split(delimiter)
                            .reduce((acc, v, i) => {
                                acc[keys[i]] = v
                                return acc
                            }, {}))
}

const dbs = [
    ['classes', './src/db/csv/classes.csv'],
    ['editions', './src/db/csv/editions.csv'],
    ['feats', './src/db/csv/feats.csv'],
    ['language', './src/db/csv/language.csv'],
    ['races', './src/db/csv/races.csv'],
    ['rulebooks', './src/db/csv/rulebooks.csv'],
    ['skilltricks', './src/db/csv/skilltricks.csv'],
].reduce((acc,[name, path]) => {
    const db = csvToJson(path)
    acc[name] = db
    return acc
},{})

fs.writeFileSync('./src/db/json/dbs.json', JSON.stringify(dbs,null, 2))

const nameToId = json => json.reduce((acc, v) => ({...acc, [v.name]: v.id}),{})

const dbNamesToIds = Object
    .entries(dbs)
    .reduce(
        (acc, [name, db]) => {
            acc[name] = nameToId(db)
            return acc
        },
    {})

fs.writeFileSync('./src/db/json/invertedIndices.json', JSON.stringify(dbNamesToIds,null, 2))

module.exports = {
    csvToJson
}