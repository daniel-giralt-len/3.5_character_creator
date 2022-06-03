import styled from 'styled-components'
import CorpusItem from './CorpusItem'
import { SidewaysBlackLabel } from '../sharedComponents'
import findInDb from '../functions/findInDb'

const CorpusListWrapper = styled.ul`
    padding: 0;
    margin: 10px 0;
    *{
        margin-bottom: 2px;
    }
`

const CorpusList = ({
    skills,
    extraSkills,
    translate,
    ...lists
    /* races
    rulebooks
    editions
    feats
    classes
    skilltricks
    language */
}) => (
    <>
        {Object.entries(lists).map(([listName, list]) => (
            <CorpusListWrapper key={listName}>
                <SidewaysBlackLabel
                    name={translate(listName)}
                />
                {
                    [
                        ...list.allowed.map(id=>({id, allowed:true})),
                        ...list.forbidden.map(id=>({id, allowed:false}))
                    ]
                    .map(({id, ...rest})=>({id, ...findInDb(listName, id) ,...rest}))
                    .sort((a,b) => a.name.localeCompare(b.name))
                    .map(({name, allowed}) => (<CorpusItem
                        key={name}
                        name={name}
                        allowed={allowed}
                    />))

            }
            </CorpusListWrapper>
        ))}
        <CorpusListWrapper>
            
        </CorpusListWrapper>
    </>
)

export default CorpusList