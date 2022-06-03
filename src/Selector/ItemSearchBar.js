import styled from 'styled-components'

const ItemSearchBarWrapper = styled.textarea`
resize: none;
font-size: 1.5em;
padding: 10px 10px;
border-width: 2px;
border-color: #340000;
border-radius: 15px;
margin: 10px;
width: -webkit-fill-available;
`

const ItemSearchBar = ({onChange, translate}) => (
    <ItemSearchBarWrapper
        rows={1}
        cols={50}
        onChange={onChange}
        placeholder={`${translate('search')}...`}
    />
)

export default ItemSearchBar