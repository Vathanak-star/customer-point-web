import {
  Routes, Route,
} from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import HomePage from './pages/Home'
import PrivateRoutes from './utils/PrivateRoutes.jsx'

function App() {

  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<HomePage/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </div>
  )
}

export default App
