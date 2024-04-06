import { forwardRef, InputHTMLAttributes, useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { colors } from '@/styles/colorPalette'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string
  isChecked?: boolean // isChecked prop 추가
  onCheckChange?: (checked: boolean) => void
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
    color: ${colors.white};
    border: none;
    opacity: 0;
    transform: rotate(-45deg);
  }

  & input[type='checkbox'] {
    visibility: hidden;
  }

  & input[type='checkbox']:checked + label {
    background-color: ${colors.blue980};
  }

  & input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { isChecked: propChecked, text, onCheckChange, ...props },
  ref,
) {
  const [isChecked, setIsChecked] = useState(propChecked || false)

  useEffect(() => {
    setIsChecked(propChecked || false) // prop 변경 시 isChecked 상태 업데이트
  }, [propChecked])

  const handleCheck = () => {
    const newChecked = !isChecked
    setIsChecked(newChecked)
    if (onCheckChange) onCheckChange(newChecked)
  }

  return (
    <Flex
      align="center"
      justify="center"
      gap={5}
      css={containerStyle}
      onClick={handleCheck}
    >
      <input
        id="checkbox"
        name="inUse"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheck}
        {...props}
      />
      <label htmlFor="checkbox"></label>
      <Text typography="t5" style={{ lineHeight: 'normal' }}>
        {text}
      </Text>
    </Flex>
  )
})

export default Checkbox
