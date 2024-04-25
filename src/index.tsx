import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import reportWebVitals from './reportWebVitals'

import App from './App'

import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import { DialogContextProvider } from '@contexts/DialogContext'
import { ModalContextProvider } from '@contexts/ModalContext'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <DialogContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </DialogContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

reportWebVitals()
