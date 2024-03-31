import { css } from '@emotion/react'

import { colors } from '@/styles/colorPalette'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { forwardRef, InputHTMLAttributes, useState } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string
  defaultChecked?: boolean
}

const containerStyle = css`
  width: fit-content;
  height: 35px;
  cursor: pointer;

  &:hover > span {
    color: ${colors.blue980};
  }

  & > input {
    display: none;
  }

  & label {
    background-color: ${colors.white};
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 26px;
    width: 26px;
  }

  & label:after {
    height: 6px;
    width: 12px;
    position: relative;
    left: 7px;
    top: 7px;
    content: '✔';

    color: ${colors.blue980};
    border: none;
    opacity: 0;
    transform: rotate(-45deg);
  }

  & input[type='checkbox'] {
    visibility: hidden;
  }

  & input[type='checkbox']:checked + label {
    background-color: ${colors.white};
  }

  & input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { defaultChecked, text, ...props },
  ref,
) {
  const [isChecked, setIsChecked] = useState(defaultChecked || false)

  const handleCheck = () => {
    console.log('handleCheck : ', isChecked)
    setIsChecked((prev) => !prev)
  }

  return (
    <Flex
      align="center"
      justify="center"
      gap={5}
      css={containerStyle}
      onClick={handleCheck}
    >
      <input id="checkbox" type="checkbox" checked={isChecked} {...props} />
      <label htmlFor="checkbox"></label>
      <Text typography="t5" style={{ lineHeight: 'normal' }}>
        {text}
      </Text>
    </Flex>
  )
})

export default Checkbox
