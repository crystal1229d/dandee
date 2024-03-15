import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from '@shared/Navbar'
import CheckListPage from '@pages/checklist'
import HomePage from '@pages/Home'
import SigninPage from '@pages/Signin'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/checklist" element={<CheckListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
