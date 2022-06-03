import styled from 'styled-components'
import CorpusItem from './CorpusItem'
import findInDb from '../functions/findInDb'

const CorpusList = ({
    skills,
    extraSkills,
    ...lists
    /* rulebooks,
    editions,
    feats,
    classes,
    skillTricks,
    languages, */
}) => (
    <>
        {Object.entries(lists).map(([listName, list]) => (
            <ul>
                {
                    [
                        ...list.allowed.map(id=>({id, allowed:true})),
                        ...list.forbidden.map(id=>({id, allowed:false}))
                    ]
                    .map(({id, ...rest})=>({id, ...findInDb(listName, id) ,...rest}))
                    .sort((a,b) => a.name.localeCompare(b.name))
                    .map(item => (<li>{JSON.stringify(item)}</li>
                        
                    ))

            }
            </ul>
        ))}
    </>
)

export default CorpusList