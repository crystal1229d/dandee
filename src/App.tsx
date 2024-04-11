import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthProvider from '@components/auth/AuthProvider'
import AuthRoute from './components/auth/AuthRoute'

import Navbar from '@shared/Navbar'
import HomePage from '@pages/Home'
import CheckListInUsePage from '@pages/ChecklistInUse'
import ChecklistsPage from '@pages/Checklists'
import SigninPage from '@pages/Signin'
import MyPage from '@pages/My'
import DevPage from '@pages/Dev'
import ChecklistEditFormPage from './pages/ChecklistEditForm'
import ChecklistCreateFormPage from './pages/ChecklistCreateForm'
import ItinerariesPage from './pages/Itineraries'

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
                <CheckListInUsePage />
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
                <ChecklistCreateFormPage />
              </AuthRoute>
            }
          />
          <Route
            path="/checklist/edit"
            element={
              <AuthRoute>
                <ChecklistEditFormPage />
              </AuthRoute>
            }
          />
          <Route
            path="/itineraries"
            element={
              <AuthRoute>
                <ItinerariesPage />
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
