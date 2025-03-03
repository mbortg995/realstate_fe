import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import LoginPage from '@/pages/auth/LoginPage.jsx'
import RegisterPage from '@/pages/auth/RegisterPage.jsx'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
