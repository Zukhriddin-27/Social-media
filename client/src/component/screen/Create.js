import React from 'react'
import { useState, useEffect } from 'react'

import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'

import './style/create.css'
export default function Create() {
  const navigate = useNavigate()
  const [frends, setFrends] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (url) {
      fetch('/createpost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          title: title,
          body: body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: '#ff1744 red accent-3' })
          } else {
            M.toast({
              html: "Siz muvaffaqiyatli maqola qo'shtingiz",
              classes: '#2e7d32 green darken-3',
            })
            navigate('/')
          }
        })
    }
    //eslint-disable-next-line
  }, [url])

  const postDetails = () => {
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

  return (
    <>
      <div className='posts'>
        <div className={frends ? 'container_posts active' : 'container_posts'}>
          <div className='wrapper'>
            <section className='post'>
              <header>Create Post</header>
              <form action='#'>
                <div className='content'>
                  <img src='/assets/icons/logo.png' alt='logo' />
                  <div className='details'>
                    <p>CodingNepal</p>
                    <div className='privacy'>
                      <i className='fas fa-user-friends'></i>
                      <span onClick={() => setFrends(!frends)}>Friends</span>
                      <i className='fas fa-caret-down'></i>
                    </div>
                  </div>
                </div>
                <input
                  placeholder="What's on your title?"
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <textarea
                  placeholder="What's on your mind?"
                  type='text'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                {/* <div className='theme-emoji'>
                <img src='/assets/icons/theme.svg' alt='theme' />
                <img src='/assets/icons/smile.svg' alt='smile' />
              </div> */}
                <div className='options'>
                  <input
                    type='file'
                    id='myfile'
                    // style={{ display: 'none', visibility: 'none' }}
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                  <ul className='list'>
                    <li>
                      <label htmlFor='myfile'>
                        <img src='/assets/icons/gallery.svg' alt='gallery' />
                      </label>
                    </li>
                    <li>
                      <img src='/assets/icons/tag.svg' alt='gallery' />
                    </li>
                    <li>
                      <img src='/assets/icons/emoji.svg' alt='gallery' />
                    </li>
                    <li>
                      <img src='/assets/icons/mic.svg' alt='gallery' />
                    </li>
                    <li>
                      <img src='/assets/icons/more.svg' alt='gallery' />
                    </li>
                  </ul>
                </div>
                <button
                  type='button'
                  className='btn'
                  onClick={() => postDetails()}
                >
                  Post
                </button>
              </form>
            </section>
            <section className='audience'>
              <header>
                <div className='arrow-back' onClick={() => setFrends(!frends)}>
                  <i className='fas fa-arrow-left'></i>
                </div>
                <p>Select Audience</p>
              </header>
              <div className='content'>
                <p>Who can see your post?</p>
                <span>
                  Your post will show up in News Feed, on your profile and in
                  search results.
                </span>
              </div>
              <ul className='list'>
                <li>
                  <div className='column'>
                    <div className='icon'>
                      <i className='fas fa-globe-asia'></i>
                    </div>
                    <div className='details'>
                      <p>Public</p>
                      <span>Anyone on or off Facebook</span>
                    </div>
                  </div>
                  <div className='radio'></div>
                </li>
                <li className='active'>
                  <div className='column'>
                    <div className='icon'>
                      <i className='fas fa-user-friends'></i>
                    </div>
                    <div className='details'>
                      <p>Friends</p>
                      <span>Your friends on Facebook</span>
                    </div>
                  </div>
                  <div className='radio'></div>
                </li>
                <li>
                  <div className='column'>
                    <div className='icon'>
                      <i className='fas fa-user'></i>
                    </div>
                    <div className='details'>
                      <p>Specific</p>
                      <span>Only show to some friends</span>
                    </div>
                  </div>
                  <div className='radio'></div>
                </li>
                <li>
                  <div className='column'>
                    <div className='icon'>
                      <i className='fas fa-lock'></i>
                    </div>
                    <div className='details'>
                      <p>Only me</p>
                      <span>Only you can see your post</span>
                    </div>
                  </div>
                  <div className='radio'></div>
                </li>
                <li>
                  <div className='column'>
                    <div className='icon'>
                      <i className='fas fa-cog'></i>
                    </div>
                    <div className='details'>
                      <p>Custom</p>
                      <span>Include and exclude friends</span>
                    </div>
                  </div>
                  <div className='radio'></div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
