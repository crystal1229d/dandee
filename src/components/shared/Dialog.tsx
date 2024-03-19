import styled from '@emotion/styled'

import { zIndex } from '@styles/sharedStyles'
import { colors } from '@styles/colorPalette'
import Text from '@shared/Text'
import Dimmed from '@shared/Dimmed'
import Flex from '@shared/Flex'
import Button from '@shared/Button'

interface DialogProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  confirmButtonLabel?: string
  onCancelClick?: () => void
  onConfirmClick: () => void
}

function Dialog({
  open,
  title,
  description,
  confirmButtonLabel = '확인',
  onCancelClick,
  onConfirmClick,
}: DialogProps) {
  if (!open) {
    return null
  }

  return (
    <Dimmed>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <Text
          typography="t4"
          bold={true}
          display="block"
          style={{ marginBottom: 6 }}
        >
          {title}
        </Text>
        {description && <Text typography="t7">{description}</Text>}
        <Flex justify="flex-end">
          <Button
            onClick={onCancelClick}
            weak={true}
            style={{ marginTop: 12, border: 'none', marginRight: 8 }}
          >
            취소
          </Button>
          <Button
            onClick={onConfirmClick}
            weak={true}
            style={{ marginTop: 12, border: 'none' }}
          >
            {confirmButtonLabel}
          </Button>
        </Flex>
      </DialogContainer>
    </Dimmed>
  )
}

const DialogContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: ${zIndex.confirm};
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`

export default Dialog
