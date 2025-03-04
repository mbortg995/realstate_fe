import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import LoginPage from '@/pages/auth/LoginPage.jsx'
import RegisterPage from '@/pages/auth/RegisterPage.jsx'
import { AuthProvider } from './context/AuthContext'



function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<h1>LOGUEADO</h1>}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
