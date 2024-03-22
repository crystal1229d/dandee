import { css } from '@emotion/react'

import { colors } from '@/styles/colorPalette'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

interface CheckboxProps {
  text?: string
  checked?: boolean
  onCheck: () => void
}

function Checkbox({ checked, onCheck, text }: CheckboxProps) {
  return (
    <Flex align="center" justify="center" gap={5} css={containerStyle}>
      <input type="checkbox" checked={checked} onChange={onCheck} />
      <label htmlFor="checkbox"></label>
      <Text typography="t5" style={{ lineHeight: 'normal' }}>
        {text}
      </Text>
    </Flex>
  )
}

const containerStyle = css`
  width: fit-content;
  height: 35px;

  & > input {
    display: none;
  }

  label {
    background-color: ${colors.white};
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 26px;
    width: 26px;
  }

  label:after {
    border: 2px solid ${colors.white};
    border-top: none;
    border-right: none;
    content: '';
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 12px;
  }

  input[type='checkbox'] {
    visibility: hidden;
  }

  input[type='checkbox']:checked + label {
    background-color: ${colors.blue980};
    border-color: ${colors.blue980};
  }

  input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`

export default Checkbox
