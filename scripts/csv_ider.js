const fs = require('fs')

const populateId = path => {
    const raw = fs.readFileSync(path)
    const lines = raw.toString().split('\n')
    const [header, ...values] = lines

    if(header.includes('id,')){ return }

    const idValues = values.map((l,i) => `${i+1},${l}`)
    const rawOut = [`id,${header}`, ...idValues].join('\n')

    fs.writeFileSync(path, rawOut)

}

[
    ['classes', './db/csv/classes.csv'],
    ['editions', './db/csv/editions.csv'],
    ['feats', './db/csv/feats.csv'],
    ['language', './db/csv/language.csv'],
    ['races', './db/csv/races.csv'],
    ['rulebooks', './db/csv/rulebooks.csv'],
    ['skillTricks', './db/csv/skillTricks.csv'],
].forEach(([path]) => populateId(path))