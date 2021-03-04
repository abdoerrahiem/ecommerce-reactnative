import styled, {css} from 'styled-components'

const TrafficLight = styled.View`
  border-radius: 50px;
  width: 10px;
  height: 10px;
  padding: 10px;

  ${({available}) =>
    available &&
    css`
      background: #afec1a;
    `}

  ${({limited}) =>
    limited &&
    css`
      background: #dde033;
    `}

    ${({unavailable}) =>
    unavailable &&
    css`
      background: #ec241a;
    `}
`

export default TrafficLight
