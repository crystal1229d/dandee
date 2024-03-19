import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthProvider from '@components/auth/AuthProvider'
import AuthRoute from './components/auth/AuthRoute'

import Navbar from '@shared/Navbar'
import HomePage from '@pages/Home'
import CheckListPage from '@pages/checklist'
import ChecklistsPage from '@pages/Checklists'
import SigninPage from '@pages/Signin'
import MyPage from '@pages/My'
import DevPage from '@pages/Dev'
import ChecklistFormPage from '@pages/ChecklistForm'

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
            path="/checklists"
            element={
              <AuthRoute>
                <ChecklistsPage />
              </AuthRoute>
            }
          />
          <Route
            path="/checklist/new"
            element={
              <AuthRoute>
                <ChecklistFormPage />
              </AuthRoute>
            }
          />
          <Route
            path="/checklist/edit"
            element={
              <AuthRoute>
                <ChecklistFormPage />
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
          <Route path="/dev" element={<DevPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
