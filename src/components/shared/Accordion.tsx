import { PropsWithChildren, useEffect, useState } from 'react'
import Text from './Text'
import { IoIosArrowDown } from 'react-icons/io'
import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'
import { spacing } from '@/styles/spacing'
import { css } from '@emotion/react'
import Flex from '@shared/Flex'

interface AccordionProps {
  label: string
  subLabel?: React.ReactNode
  isExpanded?: boolean
}

function Accordion({
  label,
  subLabel = null,
  isExpanded = false,
  children,
}: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState(isExpanded)

  useEffect(() => {
    setExpanded(isExpanded)
  }, [isExpanded])

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <Flex dir="column" css={container}>
      <Header onClick={handleToggle} expanded={expanded}>
        <Flex>
          <Text bold={true}>{label}</Text>
          {subLabel}
        </Flex>
        <IoIosArrowDown id="arrow" />
      </Header>
      <Contents expanded={expanded}>{children}</Contents>
    </Flex>
  )
}

const container = css`
  margin: 0 ${spacing.pageLeftRight};
  padding: 0 ${spacing.pageLeftRight};
  background: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 10px;

  &:hover {
    border: 1px solid ${colors.gray500};
  }
`

const Header = styled.div<{ expanded: boolean }>`
  width: 100%;
  height: 65px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.gray600};

  cursor: pointer;

  & svg[id='arrow'] {
    width: 20px;
    height: 20px;

    transition: all 0.3s ease;
    transform: ${({ expanded }) =>
      expanded ? 'rotate(-180deg)' : 'rotate(0deg)'};
  }
`

const Contents = styled.div<{ expanded: boolean }>`
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`

export default Accordion
