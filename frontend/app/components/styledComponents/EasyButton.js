import styled, {css} from 'styled-components'

const EasyButton = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 3px;
  padding: 10px;
  margin: 5px;
  justify-content: center;
  background: transparent;

  ${({primary}) =>
    primary &&
    css`
      background: #5cb85c;
    `}

  ${({secondary}) =>
    secondary &&
    css`
      background: #62b1f6;
    `}

    ${({danger}) =>
    danger &&
    css`
      background: #f40105;
    `}

    ${({large}) =>
    large &&
    css`
      width: 135px;
    `}

    ${({md}) =>
    md &&
    css`
      width: 100px;
    `}

    ${({small}) =>
    small &&
    css`
      width: 40px;
    `}
`

export default EasyButton
