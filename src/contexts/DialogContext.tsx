import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import Dialog from '@shared/Dialog'

type DialogProps = ComponentProps<typeof Dialog>
type DialogOptions = Omit<DialogProps, 'open'>

interface DialogContextValue {
  open: (options: DialogOptions) => void
}

const Context = createContext<DialogContextValue | undefined>(undefined)

const defaultValues: DialogProps = {
  open: false,
  title: null,
  description: null,
  onConfirmClick: () => {},
}

export function DialogContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [dialogState, setDialogState] = useState(defaultValues)

  const $portal_root = document.getElementById('root-portal')

  const close = useCallback(() => {
    setDialogState(defaultValues)
  }, [])

  const open = useCallback(
    ({ onConfirmClick, ...options }: DialogOptions) => {
      setDialogState({
        ...options,
        onConfirmClick: () => {
          close()
          onConfirmClick()
        },
        onCancelClick: () => {
          close()
        },
        open: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open])

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Dialog {...dialogState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useDialogContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('DialogContext 내부에서 사용해주세요')
  }

  return values
}
