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
    ['classes', './src/db/csv/classes.csv'],
    ['editions', './src/db/csv/editions.csv'],
    ['feats', './src/db/csv/feats.csv'],
    ['language', './src/db/csv/language.csv'],
    ['races', './src/db/csv/races.csv'],
    ['rulebooks', './src/db/csv/rulebooks.csv'],
    ['skillTricks', './src/db/csv/skillTricks.csv'],
].forEach(([path]) => populateId(path))