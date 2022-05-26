function CorpusSelector({
    isCorpus,
    corpuses,
    translate,
    handleCorpusChange,
    selectedCorpus
}) {
    return (
        <>
            {!isCorpus && (
                <div>
                    {translate('selected corpus')}
                    <div>
                        {Object.entries(corpuses).map(([id, { name }]) => (
                            <span key={id}>
                                <input
                                    onChange={handleCorpusChange}
                                    type='radio'
                                    name='corpus'
                                    value={id}
                                    key={id}
                                    checked={selectedCorpus === id}
                                />
                                {translate(name)}
                            </span>
                        ))
                        }
                    </div>
                </div>)}
        </>
    )
}
export default CorpusSelector;