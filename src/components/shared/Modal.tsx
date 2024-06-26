import { CSSProperties } from 'react'
import styled from '@emotion/styled'

import { colors } from '@styles/colorPalette'
import { zIndex } from '@styles/sharedStyles'
import Dimmed from '@shared/Dimmed'
import Button from '@shared/Button'
import Flex from '@shared/Flex'

import { IoCloseOutline } from 'react-icons/io5'
import Text from './Text'
import { css } from '@emotion/react'

interface ModalProps {
  isOpen?: boolean
  title: React.ReactNode
  contents: React.ReactNode
  onClose?: () => void
  onConfirm: () => void
  confirmButtonLabel?: string
  size?: 'small' | 'medium' | 'large' | 'full'
  style?: CSSProperties
}

const Modal = ({
  isOpen,
  title,
  contents,
  onClose,
  onConfirm,
  confirmButtonLabel = '확인',
  size = 'full',
  style,
}: ModalProps) => {
  if (!isOpen) return null

  const modalStyle: CSSProperties = {
    width: size === 'full' ? '100vw' : style?.width,
    height: size === 'full' ? '100vh' : style?.height,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: colors.white,
    borderRadius: '8px',
    overflow: 'hidden',
    zIndex: zIndex.confirm,
    boxSizing: 'border-box',
    ...style,
  }

  return (
    <Dimmed>
      <ModalContainer style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <Flex
          align="center"
          justify="space-between"
          style={{
            paddingBottom: '20px',
            borderBottom: `1px solid ${colors.gray400}`,
          }}
        >
          {title && (
            <Text typography="t4" bold>
              {title}
            </Text>
          )}
          <CloseButton onClick={onClose}>
            <IoCloseOutline onClick={onClose} />
          </CloseButton>
        </Flex>

        {contents}

        <Flex align="center" justify="space-between">
          <Button css={bottomCloseButton} onClick={onClose} weak>
            취소
          </Button>
          <Button css={bottomConfirmButton} onClick={onConfirm}>
            {confirmButtonLabel}
          </Button>
        </Flex>
      </ModalContainer>
    </Dimmed>
  )
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  box-sizing: border-box;
`

const CloseButton = styled.button`
  font-size: 1.9rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
`

const bottomCloseButton = css`
  height: 50px;
  flex: 0.27;
  font-size: 1rem;
`

const bottomConfirmButton = css`
  height: 50px;
  flex: 0.71;
  font-size: 1rem;
`

export default Modal
