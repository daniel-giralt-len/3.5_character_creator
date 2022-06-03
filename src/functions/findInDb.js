import dbs from '../db/json/dbs'
const findInDb = (type, id) => {
    if(!dbs || !dbs[type]) { return }
    return dbs[type].find(item => item.id === id)
}
export default findInDb