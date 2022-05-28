import styled from 'styled-components'

const ClassLayout = styled.ul`
    
`

function ScoreDisplay({
    classes = [],
    translate,
    handleClassChange
}) {

    return (
        <div>
            <h3>{translate('classes')}</h3>
            <ul>
                {classes
                    .map((id,i) => (
                        <ClassLayout key={`${i+1}-${id}`}>{i+1}:{id}
                        </ClassLayout>
                    ))
                }
            </ul>
        </div>
    );
}

export default ScoreDisplay;
