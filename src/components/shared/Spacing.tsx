import styled from '@emotion/styled'

import { Colors, colors } from '@styles/colorPalette'

interface SpacingProps {
  size: number
  dir?: 'vertical' | 'horizontal'
  backgroundColor?: Colors
}

const Spacing = styled.div<SpacingProps>`
  ${({ size, dir = 'vertical' }) =>
    dir === 'vertical'
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${colors[backgroundColor]};`}
`

export default Spacing
