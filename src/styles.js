import styled from 'styled-components'

const SelectedButton = styled.button`
  ${({selected})=> selected ? `
  background: #bbd9f3a3;
  ` : ''}
`

export {
    SelectedButton,
}