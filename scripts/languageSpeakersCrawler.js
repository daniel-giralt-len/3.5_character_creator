
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
][6]
const doIt = async () => {
    const itemList = dbs[itemType]
    const htmls = []
    for (let i=0; i < itemList.length; i++){
        const {link, id} = itemList[i]
        console.log('reading', `${id}/${itemList.length}` , link)

        const html = await get(link)
        htmls.push({id, html})
    }
    htmls.forEach(({id, html}) => {
        const path = `./src/db/html/${itemType}/${id}.html`
        fs.writeFileSync(path, html)
    })
}

(async () => doIt())();