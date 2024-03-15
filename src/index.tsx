import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import reportWebVitals from './reportWebVitals'

import App from './App'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)

reportWebVitals()
