const delimiter = ','
const fs = require('fs')
const csvToJson = (path) => {
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

module.exports = csvToJson