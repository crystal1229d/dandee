import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import reportWebVitals from './reportWebVitals'

import App from './App'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import { QueryClient, QueryClientProvider } from 'react-query'

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
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

reportWebVitals()
