import onlyUnique from "../filterOnlyUnique"

const mergePreviousAndCurrent = (a={},b={}, mergeMethod) => {
    return [ ...Object.keys(a), ...Object.keys(b) ]
    .filter(onlyUnique)
    .reduce((acc, k) => ({
        ...acc,
        [k]: mergeMethod(a[k], b[k])
    }),{})
}

export default mergePreviousAndCurrent