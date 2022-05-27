const axios = require('axios');

const dndToolsUrl = 'https://dndtools.org/'
const get = async link => {
    return axios
        .get(`${dndToolsUrl}${link}`)
        .then(res => res.data)
        .catch(console.error)
}

module.exports = {
    get
}
