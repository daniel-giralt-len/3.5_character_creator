const findInDb = (dbs, type, id) => {
    if(!dbs || !dbs[type]) { return }
    return dbs[type].find(item => item.id === id)
}
export default findInDb