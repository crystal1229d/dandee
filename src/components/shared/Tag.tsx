import styled from '@emotion/styled'
import { Colors, colors } from '@styles/colorPalette'

interface TagProps {
  color?: string
  backgroundColor?: string
}

const Tag = styled.span<TagProps>(
  ({ color = colors.white, backgroundColor = colors.blue }) => ({
    width: 'fit-content',
    height: 'fit-content',
    fontSize: '14px',
    padding: '5px 11px',
    fontWeight: 'bold',
    borderRadius: '5px',
    textAlign: 'center',

    color: color in colors ? colors[color as Colors] : color,
    backgroundColor:
      backgroundColor in colors
        ? colors[backgroundColor as Colors]
        : backgroundColor,
  }),
)

export default Tag
