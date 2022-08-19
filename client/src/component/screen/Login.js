import React from 'react'

import { UserContext } from '../../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

function Login(props) {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const { logEmail, logPassword, setLogEmail, setLogPassword } = props

  const logData = () => {
    // eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(logEmail)) {
      M.toast({
        html: "Email manziligizni to'gri kiriting!.",
        classes: ' #ff1744 red accent-3',
      })
      return
    }
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: logEmail,
        password: logPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: ' #ff1744 red accent-3' })
        } else {
          localStorage.setItem('jwt', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          dispatch({ type: 'USER', payload: data.user })
          M.toast({
            html: 'Siz muvafaqqiyyatli kirdingiz',
            classes: '#3e7d32 green darken-3',
          })
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='form'>
      <div className=' sign-in-form'>
        <h2 className='title'>Sign in</h2>
        <div className='input-field'>
          <i className='fas fa-user'></i>
          <input
            type='text'
            placeholder='Email'
            value={logEmail}
            onChange={(e) => setLogEmail(e.target.value)}
          />
        </div>
        <div className='input-field'>
          <i className='fas fa-lock'></i>
          <input
            type='password'
            placeholder='Password'
            value={logPassword}
            onChange={(e) => setLogPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='btn'
          value='Sign ip'
          onClick={() => logData()}
        >
          Sign in
        </button>
        <p className='social-text'>Or Sign in with social platforms</p>
        <div className='social-media'>
          {/* eslint-disable-next-line */}
          <a href='#' className='social-icon'>
            <i className='fab fa-facebook-f'></i>
          </a>
          {/* eslint-disable-next-line */}
          <a href='#' className='social-icon'>
            <i className='fab fa-twitter'></i>
          </a>
          {/* eslint-disable-next-line */}
          <a href='#' className='social-icon'>
            <i className='fab fa-google'></i>
          </a>
          {/* eslint-disable-next-line */}
          <a href='#' className='social-icon'>
            <i className='fab fa-linkedin-in'></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
