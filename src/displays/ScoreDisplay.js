import styled from 'styled-components'

const ScoreLayout = styled.li`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: "label counter bonuses total";
    grid-column-gap: 5px;
    margin-bottom: 5px;
    text-align: center;
    background: ${({warning}) => warning ? '#fff90033' : ''};
`

const WarningText = styled.div`
    display: inline;
    ${({warning}) => warning ? `
    color: #ff0000;
    font-weight: bold;
    ` : ''};
`

const LabelWrapper = styled.label`
    grid-area: label;
`

const CounterWrapper = styled.input`
    grid-area: counter;
`

const LabelHeaderWrapper = styled.div`
    grid-area: label;
`

const CounterHeaderWrapper = styled.div`
    grid-area: counter;
`

const BonusesWrapper = styled.div`
    grid-area: bonuses;
`

const TotalWrapper = styled.div`
    grid-area: total;
`

function ScoreDisplay({
    baseAbilityScores,
    translate,
    handleScoreChange,
    saves,
    scoreBonuses = {},
    usedFeats,
    maxFeats,
}) {
    const onScoreChange = (score, value) => handleScoreChange({ ...baseAbilityScores, [score]: parseInt(value) })
    const areFeatsOverBudget = usedFeats>maxFeats

    return (
        <div>
            <h3>{translate('scores')}</h3>
            <ul>
                <ScoreLayout>
                    <LabelHeaderWrapper>{translate('name')}</LabelHeaderWrapper>
                    <CounterHeaderWrapper>{translate('base')}</CounterHeaderWrapper>
                    <BonusesWrapper>{translate('bonuses')}</BonusesWrapper>
                    <TotalWrapper>{translate('total')}</TotalWrapper>
                </ScoreLayout>
                {Object
                    .entries(baseAbilityScores)
                    .map(([score, value]) => (
                        <ScoreLayout key={score}>
                            <LabelWrapper>{translate(score)}</LabelWrapper>
                            <CounterWrapper
                                type="number"
                                step="1"
                                value={value}
                                name={score}
                                id={score}
                                max={50}
                                min={0}
                                onChange={e => onScoreChange(score, e.target.value)}
                            />
                            <BonusesWrapper>{(scoreBonuses[score]||0)}</BonusesWrapper>
                            <TotalWrapper>{value + (scoreBonuses[score]||0)}</TotalWrapper>
                        </ScoreLayout>
                    ))
                }
                <ScoreLayout warning={areFeatsOverBudget}>
                    <LabelHeaderWrapper>{translate('feats')}</LabelHeaderWrapper>
                    <TotalWrapper><WarningText warning={areFeatsOverBudget}>{usedFeats}</WarningText> / {maxFeats}</TotalWrapper>
                </ScoreLayout>
                <ScoreLayout>
                    <LabelHeaderWrapper>{translate('bab')}</LabelHeaderWrapper>
                    <TotalWrapper>{scoreBonuses.bab}</TotalWrapper>
                </ScoreLayout>
                {Object
                    .entries(saves)
                    .map(([save, value]) => (
                        <ScoreLayout key={save}>
                            <LabelWrapper>{translate(save)}</LabelWrapper>
                            <TotalWrapper>{scoreBonuses[save]}</TotalWrapper>
                        </ScoreLayout>
                    ))
                }
            </ul>
        </div>
    );
}

export default ScoreDisplay;
