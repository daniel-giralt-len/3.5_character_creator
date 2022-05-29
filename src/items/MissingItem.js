import styled from 'styled-components'

const MissingItemWrapper = styled.div`
    padding: 15px;
    margin: 10px;
    
    background: #fff90033;
    box-shadow: 0px 0px 1px 0px #340000;
}`


function MissingItem ({ itemType, translate }) {
    return (<MissingItemWrapper>
        {translate('your character needs a')} {translate(itemType).toLowerCase()}.
    </MissingItemWrapper>)
}

export default MissingItem