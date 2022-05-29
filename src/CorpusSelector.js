function CorpusSelector({
    corpuses,
    translate,
    onCorpusChange,
    selectedCorpus
}) {
    return (
        <>
            <div>
                {translate('selected corpus')}
                <div>
                    {Object.entries(corpuses).map(([id, { name }]) => {
                        const onClick = () => onCorpusChange(id)
                        return(
                            <span onClick={onClick} key={id}>
                                <input
                                    onChange={onClick}
                                    type='radio'
                                    name='corpus'
                                    value={id}
                                    key={id}
                                    checked={selectedCorpus === id}
                                />
                                <label htmlFor={id}>
                                    {translate(name)}
                                </label>
                            </span>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
export default CorpusSelector;