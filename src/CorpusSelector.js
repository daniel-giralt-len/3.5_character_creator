import { SelectedButton } from "./styles";

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
                {Object.entries(corpuses).map(([id, { name }]) => {
                    const onClick = () => onCorpusChange(id)
                    return(
                        <span onClick={onClick} key={id}>
                            <input
                                type='radio'
                                name='corpus'
                                value={id}
                                key={id}
                                checked={selectedCorpus === id}
                                hidden
                            />
                            <SelectedButton
                                htmlFor={id}
                                selected={selectedCorpus === id}
                            >
                                {translate(name)}
                            </SelectedButton>
                        </span>
                    )
                })
                }
            </div>
        </>
    )
}
export default CorpusSelector;