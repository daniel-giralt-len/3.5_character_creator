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
                        <ClassLayout key={`${id}-${i}`}>{id}
                        </ClassLayout>
                    ))
                }
            </ul>
        </div>
    );
}

export default ScoreDisplay;
