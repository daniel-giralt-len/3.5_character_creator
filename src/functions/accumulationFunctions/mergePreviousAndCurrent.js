const mergePreviousAndCurrent = (a={},b={}, mergeMethod) => {
    return Array.from(
        new Set([
            ...Object.keys(a),
            ...Object.keys(b)
        ])
    ).reduce((acc, k) => ({
        ...acc,
        [k]: mergeMethod(a[k], b[k])
    }),{})
}

export default mergePreviousAndCurrent