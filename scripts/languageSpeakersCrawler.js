
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
][1]
const doIt = async () => {
    const itemList = dbs[itemType]
    const htmls = []
    for (let i=0; i < itemList.length; i++){
        const {link, id} = itemList[i]
        console.log('reading', `#${id}:` , link)

        const html = await get(link)
        htmls.push({id, html})
    }
    htmls.forEach(({id, html}) => fs.writeFileSync(`./src/db/html/${itemType}/${id}.html`, html))
}

(async () => doIt())();