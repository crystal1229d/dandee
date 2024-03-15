import { CSSProperties } from 'react'
import styled from '@emotion/styled'

interface FlexProps {
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  dir?: CSSProperties['flexDirection']
  gap?: CSSProperties['gap']
}

const Flex = styled.div<FlexProps>(({ align, justify, dir, gap }) => ({
  display: 'flex',
  alignItems: align,
  justifyContent: justify,
  flexDirection: dir,
  gap: gap,
}))

export default Flex
