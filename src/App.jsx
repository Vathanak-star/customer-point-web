import {
  Routes, Route,
} from 'react-router-dom'
import LoginPage from './pages/Login'
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
      </Routes>
    </div>
  )
}

export default App
