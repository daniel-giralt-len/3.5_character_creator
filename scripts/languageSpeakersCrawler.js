
const dbs = require('../src/db/json/dbs.json')
const { get } = require('./requestUtils')
const fs = require('fs')

const itemType = [
    "classes",
    "editions",
    "feats",
    "language",
    "races",
    "rulebooks",
    "skilltricks"
][2]
const doIt = async () => {
    const itemList = dbs[itemType]
    for (let i=0; i < itemList.length; i++){
        const {link, id} = itemList[i]
        console.log('reading', `${id}/${itemList.length}` , link)

        const html = await get(link)
        const path = `./src/db/html/${itemType}/${id}.html`
        fs.writeFileSync(path, html)
    }
}

(async () => doIt())();