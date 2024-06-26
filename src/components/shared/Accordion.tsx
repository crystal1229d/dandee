import { PropsWithChildren, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { IoIosArrowDown } from 'react-icons/io'
import { colors } from '@styles/colorPalette'
import { spacing } from '@styles/spacing'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'

interface AccordionProps {
  label: React.ReactNode
  subLabel?: React.ReactNode
  isExpanded?: boolean
  onChangeLabel?: (name: string) => void
}

function Accordion({
  label,
  subLabel = null,
  isExpanded = false,
  onChangeLabel,
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
        <Flex align="center">
          {/* <Text bold={true}>{label}</Text> */}
          <TextField
            value={label?.toString()}
            css={textFieldStyles}
            inputSize={(label?.toString().length || 1) * 1.6 || 2}
            onChange={(e) => onChangeLabel?.(e.target.value)}
          />
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

const textFieldStyles = css`
  border: none;
  font-weight: 800;
  font-size: 17px;
  line-height: 1.5;
  background-color: transparent;
  cursor: default;
  padding-left: 0;

  &:focus {
    outline: none;
  }
`

export default Accordion
