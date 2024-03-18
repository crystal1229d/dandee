import React, { createContext, useContext, useState, ReactNode } from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import Button from '@/components/shared/Button'

interface DialogContextType {
  openDialog: () => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

interface DialogProviderProps {
  children: ReactNode
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Disagree</Button>
          <Button onClick={closeDialog} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  )
}

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
