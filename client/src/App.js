import { createContext, useReducer, useEffect, useContext } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './component/screen/Home'

import SignIn from './component/screen/SignIn'
import Profile from './component/screen/Profile'
import Create from './component/screen/Create'
import { reducer, initialState } from './reducer/userReducer'
import UserProfile from './component/screen/UserProfile'
import SubsUserPost from './component/screen/subsUserPost'

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'USER', payload: user })
      // navigate('/')
    } else {
      navigate('/signin')
    }
    // eslint-disable-next-line
  }, [])
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/profile' exact element={<Profile />} />
      <Route path='/createpost' element={<Create />} />
      <Route path='/profile/:userId' exact element={<UserProfile />} />
      <Route path='/myfollowerpost' element={<SubsUserPost />} />
    </Routes>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
