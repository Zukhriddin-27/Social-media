import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../App.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import '../component/screen/style/navbar.css'
export default function Navbar() {
  const { state, dispatch } = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [searchPanel, setSearchPanel] = useState(false)
  const [userFinded, setUserFinded] = useState([])
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear()
    dispatch({ type: 'CLEAR' })
    navigate('/signin')
  }

  const renderNav = () => {
    if (state) {
      return [
        <>
          <div className='logoSearch' key='1'>
            <div className='logo'>
              <i className='fab fa-facebook-f'></i>
            </div>
            <div className='search' onClick={() => setSearchPanel(true)}>
              <div className='svg'>
                <i className='fa-solid fa-magnifying-glass '></i>
              </div>
            </div>
          </div>

          <div className='mainMenu' key='2'>
            <div className='svg active'>
              <Link to='/'>
                <i className='fa-solid fa-house-chimney'></i>
              </Link>
            </div>
            <div className='svg' key='3'>
              <Link to='/profile'>
                <i className='fa-solid fa-play'></i>
              </Link>
            </div>
            <div className='svg' key='4'>
              <Link to='/profile'>
                <i className='fa-solid fa-shop'></i>
              </Link>
            </div>
            <div className='svg' key='5'>
              <Link to='/profile'>
                <i className='fa-solid fa-users'></i>
              </Link>
            </div>
            <div className='svg' key='6'>
              <Link to='/profile'>
                <i className='fa-solid fa-map'></i>
              </Link>
            </div>
          </div>

          <div className='profileTools'>
            <div className='profile' key='7'>
              <div className='img'></div>
              <Link to='/profile'>
                <div className='username'>User</div>
              </Link>
            </div>
            <div className='tools'>
              <div className='svg' key='8'>
                <Link to='/createpost'>
                  <i className='fa-solid fa-plus'></i>
                </Link>
              </div>
              <div className='svg' key='9'>
                <Link to='/profile'>
                  <i className='fa-brands fa-facebook-messenger'></i>
                </Link>
              </div>
              <div className='svg' key='10'>
                <Link to=''>
                  <i className='fa-solid fa-bell'></i>
                </Link>
              </div>
              <div className='svg' onClick={() => logOut()}>
                <i className='fa-solid fa-right-to-bracket'></i>
              </div>
            </div>
          </div>
        </>,
      ]
    } else {
      return [
        <>
          <div className='logoSearch' key='11'>
            <div className='logo'>
              <i className='fab fa-facebook-f'></i>
            </div>
          </div>
          <div className='profileTools' key='12'>
            <div className='svg'>
              <Link to='/signin'></Link>
            </div>
          </div>
        </>,
      ]
    }
  }
  const searchUser = (query) => {
    setSearch(query)
    fetch('/searchuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((result) => setUserFinded(result.user))
      .catch((e) => console.log(e))
  }
  return (
    <div>
      <div className='header'>{renderNav()}</div>
      {searchPanel ? (
        <div className='models_container'>
          <div className='models_contents' onClick={(e) => e.stopPropagation()}>
            <div className='close'>
              <h5> Search Account </h5>
              <p onClick={() => setSearchPanel(false)}>X</p>
            </div>
            <div className='input-fields '>
              <i className='fas fa-search'></i>
              <input
                id='icon_prefix'
                type='text'
                value={search}
                onChange={(e) => searchUser(e.target.value)}
                className='validate'
                placeholder='Search...'
              />
              <i className='fas fa-close' onClick={() => setSearch('')}></i>
            </div>
            {userFinded.map((item) => (
              <ul className='search_list' key={item._id}>
                <Link
                  to={
                    item._id !== state._id ? '/profile/' + item._id : '/profile'
                  }
                >
                  <li className='profile_list'>
                    <img
                      src={item.pic}
                      alt='user image'
                      className='globalRoundProfile'
                    />
                    <div
                      className='search_email'
                      onClick={() => setSearchPanel(false)}
                    >
                      <span class='title'>{item.name}</span>
                      <p>Email: {item.email}</p>
                    </div>
                  </li>
                </Link>
              </ul>
            ))}

            {/* <button className='btn search_btn'>Save</button> */}
          </div>
        </div>
      ) : null}
    </div>
  )
}
