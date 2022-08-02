import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { useState, useEffect } from 'react'
import M from 'materialize-css'
import Login from './Login'
import './style/sign.css'

export default function SignIn() {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const [mode, setMode] = useState(false)
  const [regName, setRegName] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [logEmail, setLogEmail] = useState('')
  const [logPassword, setLogPassword] = useState('')
  const [addPicture, setAddPicture] = useState(false)
  const [image, setImage] = useState(undefined)
  const [url, setUrl] = useState(
    'https://res.cloudinary.com/dus2bqcc6/image/upload/v1659189677/photo_2022-07-30_19.01.08_qtdu0q.jpg'
  )

  const uploadPIcture = () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'webgramm')
    data.append('cloud_name', 'dus2bqcc6')
    fetch('https://api.cloudinary.com/v1_1/dus2bqcc6/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const ourFields = () => {
    // eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(regEmail)) {
      M.toast({
        html: "Email manziligizni to'gri kiriting.",
        classes: ' #ff1744 red accent-3',
      })
      return
    }
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: ' #ff1744 red accent-3' })
        } else {
          M.toast({ html: data.msg, classes: '#3e7d32 green darken-3' })
          setMode(!mode)
        }
      })
      .catch((err) => console.log(err))
  }

  const postData = () => {
    if (image) {
      uploadPIcture()
    } else {
      ourFields()
    }
  }
  useEffect(() => {
    if (url) {
      ourFields()
    }
  }, [url])

  return (
    <div>
      <div className={mode ? 'container sign-up-mode  ' : 'container'}>
        <div className='forms-container'>
          <div className='signin-signup'>
            <Login
              logEmail={logEmail}
              logPassword={logPassword}
              setLogEmail={setLogEmail}
              setLogPassword={setLogPassword}
              mode={mode}
              setMode={setMode}
            />
            <div className='form'>
              <div className=' sign-up-form'>
                <h2 className='title'>Sign up</h2>
                <div className='input-field'>
                  <i className='fas fa-user'></i>
                  <input
                    type='text'
                    placeholder='Username'
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>
                <div className='input-field'>
                  <i className='fas fa-envelope'></i>
                  <input
                    type='email'
                    placeholder='Email'
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
                <div className='input-field'>
                  <i className='fas fa-lock'></i>
                  <input
                    type='password'
                    placeholder='Password'
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>
                <button
                  type='submit'
                  className='btn'
                  value='Sign up'
                  onClick={() => postData()}
                >
                  Sign Up
                </button>
                <p className='social-text'>Or Sign up with social platforms</p>
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
          </div>
        </div>
        <div className='panels-container'>
          <div className='panel left-panel'>
            <div className='content'>
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>

              <button
                className='btn transparent'
                id='sign-up-btn'
                onClick={() => setMode(!mode)}
              >
                Sign up
              </button>
            </div>
            <img
              src={state ? state.pic : 'loading'}
              className='image'
              alt='user'
            />
          </div>
          <div className='panel right-panel'>
            <div className='content'>
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className='btn transparent'
                id='sign-in-btn'
                onClick={() => setMode(!mode)}
              >
                Sign in
              </button>
            </div>
            <div class='containers'>
              <img
                src='https://res.cloudinary.com/dus2bqcc6/image/upload/v1659189677/photo_2022-07-30_19.01.08_qtdu0q.jpg'
                alt='Avatar'
                class='image'
              />

              <div class='middle' onClick={() => setAddPicture(!addPicture)}>
                <button class='text'>
                  <i className='fas fa-plus'></i>Add Photo
                </button>
              </div>
            </div>
          </div>
          {addPicture ? (
            <div
              className='models_container'
              onClick={(e) => setAddPicture(false)}
            >
              <div
                className='models_content'
                onClick={(e) => e.stopPropagation()}
              >
                <div className='close'>
                  <h5> Add Your Account Photo</h5>
                  <p href='!#' onClick={() => setAddPicture(false)}>
                    X
                  </p>
                </div>
                <div className='addPhoto'>
                  <input
                    type='file'
                    id='myfile'
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                  <button className='btn' onClick={() => setAddPicture(false)}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
