const axios = require('axios');
const fs = require('fs')

const dndToolsUrl = 'https://dndtools.org/'
const listables = [
    {name:'races', url: 'races', pages: 1},
    {name:'rulebooks', url: 'rulebooks', pages: 1},
    {name:'classes', url: 'classes', pages: 1},
    {name:'feats', url: 'feats', pages: 4},
    {name:'skillTricks', url: 'feats/categories/skill-trick', pages: 1},
    {name:'languages', url: 'languages', pages: 1},
]

const getListable = async (mainUrl, {url: subUrl}, pageNumber) => {
    const url = mainUrl + subUrl + '?page=' + pageNumber + '&page_size=1000'
    console.log('requesting '+url)

    return axios
        .get(url)
        .then(res => res.data)
        .catch(console.error);
}

const cleanHtml = (html, i) => {
    try{
        const regex = new RegExp(/<table class="common">.*<\/table>/g)
        const oneLineHtml = html.replace(/\n/g,'')
        const result = oneLineHtml.match(regex)
        return result[0]
    
    }catch(e){
        console.log('page not working',i)
        //console.log(oneLineHtml)
        //throw e
        //return ''
    }

}

const writeHtml = ({name},html) => {
    fs.writeFileSync('./crawler_scripts/'+name+'.html', html, {flag:'w'})
}

const doIt = async item => {
    let finalHtml = ''
    for(let i = 1; i <= item.pages; i++){
        const h = await getListable(dndToolsUrl, item, i)
        finalHtml += cleanHtml(h, i)
    }
    writeHtml(item, finalHtml)
}

(async () => {
    //doIt({name:'feats', url: 'feats', pages: 181})
    listables.forEach(l => doIt(l))
})();