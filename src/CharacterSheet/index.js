import styled from 'styled-components'
import dbs from '../db/json/dbs.json'
import raceStats from '../db/json/itemData/raceStats.json'
import calculateCharacterBonuses from "../functions/calculateCharacterBonuses";
import calculateMaxFeats from "../functions/calculateMaxFeats";

const fullCenteredText = `display: flex;
align-items: center;
justify-content: center;`


const border = `2px solid black;`
const boxed = `border: ${border}`
const underlined = `border-bottom: ${border};`


const CharacterSheetLayout = styled.section`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: 
        "name classNames"
        "scores skills"
        "saves skills"
        "bab skills"
        "feats skills"
        "skilltricks skills"
        "classes classes";
`

const NameLayout = styled.div`
    grid-area: name;
`
const ClassNamesLayout = styled.div`
    grid-area: classnames;
`
const ScoresLayout = styled.ul`
    grid-area: scores;
    display: grid;
    grid-template-columns: 110px 50px 75px 50px;
    grid-row-gap: 5px;
    grid-column-gap: 5px;
    text-align: center;

    padding: 0;
    margin: 0;

    * {
        display:flex;
        align-items: center;
        justify-content: center;
    }
`
const SkillsLayout = styled.div`
    grid-area: skills;
`
const SavesLayout = styled.div`
    grid-area: saves;
`
const BabLayout = styled.div`
    grid-area: bab;
`
const FeatsLayout = styled.div`
    grid-area: feats;
`
const SkilltricksLayout = styled.div`
    grid-area: skilltricks;
`
const ClassesLayout = styled.div`
    grid-area: classes;
`

const TextInput = styled.textarea`
    resize: none;
    font-size: 1.5em;
    padding: 10px 10px;
    border-color: #000;
    margin: 10px;
    width: -webkit-fill-available;
    ${boxed}
`

const CounterInput = styled.input`
    ${boxed}
    padding: 0px 5px;
`

const SkillModCounterInput = styled.input`${underlined}`

const SkillClassCheckbox = styled.input`${boxed}`

const ReadOnlyInput = styled.span`
    ${underlined}
`

const BlackLabelWrapper = styled.div`
    ${fullCenteredText}
    background: #000;
    color: #FFF;
    display: flex;
    flex-direction: column;
    padding: 2px 8px;
`
const BoldText = styled.span`
    font-weight: 900;
    font-size: 1.3em;
`
const SmallText = styled.span`
    font-size: 0.75em;
    font-weight: 500;
`

const BlackLabel = ({name, subtitle})=>(
    <BlackLabelWrapper>
        <BoldText>{name}</BoldText>
        {subtitle && (<SmallText>{subtitle}</SmallText>)}
    </BlackLabelWrapper>
)

function CharacterSheet({
        character,
        translate,
        onCreationChange
    }){
        const {
            scores,
            saves,
            classes,
            feats,
            races,
            name
        } = character

        const raceData = raceStats[races]
        const bonuses = calculateCharacterBonuses({raceData, classes})
        const selectedFeats = Object
            .entries(feats)
            .filter(([_, selected])=>selected)
            .reduce((acc,[id])=>({...acc,[id]:true}),{})
        const nFeats = calculateMaxFeats({raceData, classes})
        const usedFeats = (Object.values(selectedFeats).filter(v=>v)||[]).length

        console.log(raceData)
        console.log(bonuses)
        console.log(selectedFeats)
        console.log(nFeats)
        console.log( usedFeats)
        
        const handleCharacterChange = scores => onCreationChange({...character, scores})
        
        const onScoreChange = (score, value) => handleCharacterChange({ ...scores, [score]: parseInt(value) })
        const onClassChange = classes => onCreationChange({...character, classes})
        const onFeatsChange = feats => onCreationChange({...character, feats})
        

        return(
            <CharacterSheetLayout>
                <NameLayout>{name}</NameLayout>
                <ClassNamesLayout>
                    
                </ClassNamesLayout>
                <ScoresLayout>
                    <SmallText>{translate('name').toUpperCase()}</SmallText>
                    <SmallText>{translate('total').toUpperCase()}</SmallText>
                    <SmallText>{translate('base').toUpperCase()}</SmallText>
                    <SmallText>{translate('race').toUpperCase()}</SmallText>
                    {Object
                        .entries(scores)
                        .map(([id, value]) => (
                            <>
                                <BlackLabel
                                    name={translate(id).toUpperCase()}
                                    subtitle={translate(`${id}_long`).toUpperCase()}
                                />
                                <BoldText>
                                    {value+bonuses[id]}
                                </BoldText>
                                <CounterInput 
                                    type="number"
                                    step="1"
                                    value={value}
                                    name={id}
                                    id={id}
                                    max={50}
                                    min={0}
                                    onChange={e => onScoreChange(id, e.target.value)}
                                />
                                <span>
                                    {bonuses[id]}
                                </span>
                            </>
                        ))
                    }
                </ScoresLayout>
                <SkillsLayout></SkillsLayout>
                <SavesLayout></SavesLayout>
                <BabLayout></BabLayout>
                <FeatsLayout></FeatsLayout>
                <SkilltricksLayout></SkilltricksLayout>
                <ClassesLayout></ClassesLayout>

            </CharacterSheetLayout>
        )
}

export default CharacterSheet