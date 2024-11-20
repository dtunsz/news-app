import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import { useContext } from 'react'
import AppContext from './components/context/AppContext'

function App() {
    const { user } = useContext(AppContext);
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<NavBar />}>
                <Route index element={<Home />} />
                <Route path='/login' element={user ? <Feed /> : <Login />} />
                <Route path='/register' element={user ? <Feed /> : <Register />} />
                <Route path='/feed' element={user ? <Feed /> :<Login />} />
                <Route path='/profile' element={user ? <Profile />: <Login /> } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
