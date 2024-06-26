import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import Modal from '@shared/Modal'

type ModalProps = ComponentProps<typeof Modal>
type ModalOptions = Omit<ModalProps, 'isoOen'>

interface ModalContextValue {
  open: (options: ModalOptions) => void
}

const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValues: ModalProps = {
  isOpen: false,
  title: null,
  contents: null,
  onConfirm: () => {},
}

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [modalState, setModalState] = useState(defaultValues)

  const $portal_root = document.getElementById('root-portal')

  const close = useCallback(() => {
    setModalState(defaultValues)
  }, [])

  const open = useCallback(
    ({ onConfirm, ...options }: ModalOptions) => {
      setModalState({
        ...options,
        onConfirm: () => {
          close()
          onConfirm()
        },
        onClose: () => {
          close()
        },
        isOpen: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open])

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Modal {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useModalContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('ModalContext 내부에서 사용해주세요')
  }

  return values
}
