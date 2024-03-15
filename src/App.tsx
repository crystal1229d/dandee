import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthProvider from '@components/auth/AuthProvider'
import Navbar from '@shared/Navbar'
import CheckListPage from '@pages/checklist'
import HomePage from '@pages/Home'
import SigninPage from '@pages/Signin'
import MyPage from '@pages/My'
import AuthRoute from './components/auth/AuthRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/checklist"
            element={
              <AuthRoute>
                <CheckListPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/my"
            element={
              <AuthRoute>
                <MyPage />
              </AuthRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
