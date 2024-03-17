import { PropsWithChildren, useState } from 'react'
import Text from './Text'
import { IoIosArrowDown } from 'react-icons/io'
import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'
import { spacing } from '@/styles/spacing'
import { css } from '@emotion/react'
import Flex from './Flex'

interface AccordionProps {
  label: string
}

function Accordion({ label, children }: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <Flex dir="column" css={container}>
      <Header onClick={handleToggle} expanded={expanded}>
        <Text>{label}</Text>
        <IoIosArrowDown />
      </Header>
      <Contents expanded={expanded}>{children}</Contents>
    </Flex>
  )
}

const container = css`
  margin: ${spacing.pageTopDown} ${spacing.pageLeftRight};
  padding: 0 ${spacing.pageLeftRight};
  background: ${colors.white};
  border-radius: 10px;
`

const Header = styled.div<{ expanded: boolean }>`
  width: 100%;
  height: 65px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  & svg {
    width: 20px;
    height: 20px;
    transform: ${({ expanded }) =>
      expanded ? 'rotate(-180deg)' : 'rotate(0deg)'};
  }
`

const Contents = styled.div<{ expanded: boolean }>`
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`

export default Accordion
