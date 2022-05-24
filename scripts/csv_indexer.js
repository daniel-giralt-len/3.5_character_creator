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
    ['classes', './db/csv/classes.csv'],
    ['editions', './db/csv/editions.csv'],
    ['feats', './db/csv/feats.csv'],
    ['language', './db/csv/language.csv'],
    ['races', './db/csv/races.csv'],
    ['rulebooks', './db/csv/rulebooks.csv'],
    ['skilltricks', './db/csv/skilltricks.csv'],
].reduce((acc,[name, path]) => {
    const db = csvToJson(path)
    acc[name] = db
    return acc
},{})

fs.writeFileSync('./db/json/dbs.json', JSON.stringify(dbs,null, 2))

const nameToId = json => json.reduce((acc, v) => ({...acc, [v.name]: v.id}),{})

const dbNamesToIds = Object
    .entries(dbs)
    .reduce(
        (acc, [name, db]) => {
            acc[name] = nameToId(db)
            return acc
        },
    {})

fs.writeFileSync('./db/json/invertedIndices.json', JSON.stringify(dbNamesToIds,null, 2))
