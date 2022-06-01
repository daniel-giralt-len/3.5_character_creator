const axios = require('axios');
const fs = require('fs');

const a = 2

if(a===0){
    const lines = fs.readFileSync('./src/db/csv/spells.csv')
        .toString()
        .split('\n')
    
    const out = lines.map((l,i)=>`${i},${l}`)
    
    fs.writeFileSync('./src/db/csv/spells2.csv',out.join('\n'))

}


const dndToolsUrl = 'https://dndtools.org'

const get = async (subUrl) => {
    const url = dndToolsUrl + subUrl 
    console.log('requesting '+url)

    return axios
        .get(url)
        .then(res => res.data)
        .catch(console.error);
}

const doIt = async () => {
    const [header, ...lines] = fs.readFileSync('./src/db/csv/spells.csv')
        .toString()
        .split('\n')
        .map(s=>s.split(','))
    
    for (let i=1000; i < lines.length; i++){
        const [id, link] = lines[i]
        console.log(`${id}/${lines.length}`)
        const description = await get(link)
        fs.writeFileSync(`./src/db/csv/${id}.json`, description.toString())
    }

}

if(a===1){
    (async () => {
        doIt()
    })();
}

if(a===2){
    const parse = id => {
        const text = fs.readFileSync(`./src/db/csv/raw/${id}.json`)
            .toString()
            .replace(/(\r\n|\n|\r)/gm, "");
        const parsers = {
            school: '<br ?/?><a.*?schools/..*?">(.*?)</a>',
            descriptor: '<br ?/?><a.*?descriptors/..*?">(.*?)</a>',
            //components: '<strong>Components:?</strong>(.*?)<br ?/?>', //already in spells.csv
            castingTime: '<strong>Casting Time:?</strong>(.*?)<br ?/?>',
            range: '<strong>Range:?</strong>(.*?)<br ?/?>',
            area: '<strong>Area:?</strong>(.*?)<br ?/?>',
            duration: '<strong>Duration:?</strong>(.*?)<br ?/?>',
            save: '<strong>Saving Throw:?</strong>(.*?)<br ?/?>',
            spellResist: '<strong>Spell Resistance:?</strong>(.*?)<br ?/?>',
            target: '<strong>Target:?</strong>(.*?)<br ?/?>',
            classes: '<strong>Level:?</strong>(.*?)<br ?/?>', //multiple
            description: '"nice-textile">(.*?)</div>',
        }
        return Object.entries(parsers).reduce((acc,[k,regex])=>({
            ...acc,
            [k]:((text.match(RegExp(regex, 'i'))||[])[1]||'').trim()
        }),{})
    }

    const [header, ...lines] = fs.readFileSync('./src/db/csv/spells.csv')
        .toString()
        .split('\n')
        .map(s=>s.split(','))

    const objects = lines
        .map((o)=>o.reduce((acc,l,i)=>({...acc,[header[i]]:l}),[]))


    const out = []
    for(let i=1; i < 4911; i++){
        out.push({
            ...objects.find(({id})=>id===i.toString()),
            ...parse(i),
        })
    }
    fs.writeFileSync(`./src/db/json/spellData.json`, JSON.stringify(out,null,2))

}