import styled from 'styled-components'

const SelectedButton = styled.button`
  ${({selected})=> selected ? `
  background: #bbd9f3a3;
  box-shadow: 0 0 3px 2px #340000;
  ` : ''}
`

export {
    SelectedButton,
}