function ScoreDisplay({scores, translate, handleScoreChange}) {
    const onScoreChange = (score, value) => handleScoreChange({ ...scores, [score]: parseInt(value) })

    return (
        <div>
            <h3>{translate('scores')}</h3>
            <ul>
                {Object
                    .entries(scores)
                    .map(([score, value]) => (
                        <li key={score}>
                            <label>{translate(score)}</label>
                            <input
                                type="number"
                                step="1"
                                value={value}
                                name={score}
                                id={score}
                                max={20}
                                min={0}
                                onChange={e => onScoreChange(score, e.target.value)}
                            />

                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ScoreDisplay;
