import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'

import './style/profile.css'
export default function Profile() {
  const [profile, setProfile] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [comment, setComment] = useState(false)
  const [edit, setEdit] = useState(false)
  const [image, setImage] = useState([])
  const [myName, setMyName] = useState('')
  // const [menu, setMenu] = useState(false)

  useEffect(() => {
    fetch('/mypost', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.myPost)
      })
  }, [])
  const likePost = (id) => {
    fetch('/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(res)
        const newData = profile.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setProfile(newData)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(res)
        const newData = profile.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setProfile(newData)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const commentPost = (text, postId) => {
    fetch('/comments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = profile.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setProfile(newData)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const deletePosts = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        const newData = profile.filter((s) => s._id !== result)
        setProfile(newData)
      })
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    if (image) {
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
          fetch('/updatepic', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                'user',
                JSON.stringify({ ...state, pic: result.pic })
              )
              dispatch({ type: 'UPDATEPIC', payload: result.pic })
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [image])
  const updatePhoto = (file) => {
    setImage(file)
  }

  const editProfile = () => {
    if (myName) {
      fetch('/editname', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          myName: myName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (myName) {
            localStorage.setItem(
              'user',
              JSON.stringify({ ...state, name: data.name })
            )
            dispatch({ type: 'EDITPROFILE', payload: data.name })
          }
          M.toast({
            html: 'Your Profile was changed successfully!!!',
            classes: '#3e7d32 green darken-3',
          })

          setEdit(false)
          console.log(edit)
        })
    }
  }
  // console.log(profile)
  return (
    <main>
      <div id='profile-upper'>
        <div id='profile-banner-image'>
          <img
            src='https://imagizer.imageshack.com/img921/9628/VIaL8H.jpg'
            alt='Banner image'
          />
        </div>
        <div id='profile-d'>
          <div id='profile-pic'>
            <img src={state ? state.pic : 'loading'} />
          </div>
          <div id='u-name'>{state ? state.name : 'Loading'}</div>
          <div className='tb' id='m-btns'>
            <div className='td'>
              <div className='m-btn'>
                <i className='material-icons'>{profile.length}</i>
                <span> post</span>
              </div>
            </div>
            <div className='td'>
              <div className='m-btn'>
                <i className='material-icons'>
                  {state ? state.followers.length : '0'}
                </i>
                <span> followers</span>
              </div>
            </div>
            <div className='td'>
              <div className='m-btn'>
                <i className='material-icons'>
                  {state ? state.following.length : '0'}
                </i>
                <Link to='/myfollowerpost'>
                  <span> following</span>
                </Link>
              </div>
            </div>
            <div className='td'>
              <div className='m-btn' onClick={() => setEdit(true)}>
                <i className='fas fa-cog'> </i>

                <p>Edit</p>
              </div>
            </div>
          </div>
        </div>
        <div id='black-grd'></div>
      </div>
      <div id='main-content'>
        <div className='tb'>
          <div className='td' id='l-col'>
            <div className='l-cnt'>
              <div className='cnt-label'>
                <i className='l-i' id='l-i-i'></i>
                <span>Intro</span>
                <div className='lb-action'>
                  <i className='fas fa-edit'></i>
                </div>
              </div>
              <div id='i-box'>
                <div id='intro-line'>Front-end Engineer</div>
                <div id='u-occ'>I love making applications with Angular.</div>
                <div id='u-loc'>
                  <i className='fas fa-map-marker-alt'></i>
                  <a href='#'>Bengaluru</a>, <a href='#'>India</a>
                </div>
              </div>
            </div>
            <div className='l-cnt l-mrg'>
              <div className='cnt-label'>
                <i className='l-i' id='l-i-p'></i>
                <span>Photos</span>
                <div className='lb-action' id='b-i'>
                  <i className='fas fa-angle-down'></i>
                </div>
              </div>
              <div id='photos'>
                <div className='tb'>
                  <div className='tr'>
                    <div className='td'></div>
                    <div className='td'></div>
                    <div className='td'></div>
                  </div>
                  <div className='tr'>
                    <div className='td'></div>
                    <div className='td'></div>
                    <div className='td'></div>
                  </div>
                  <div className='tr'>
                    <div className='td'></div>
                    <div className='td'></div>
                    <div className='td'></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='l-cnt l-mrg'>
              <div className='cnt-label'>
                <i className='l-i' id='l-i-k'></i>
                <span>
                  Did You Know<i id='k-nm'>1</i>
                </span>
              </div>
              <div>
                <div className='q-ad-c'>
                  <a href='#' className='q-ad'>
                    <img src='https://imagizer.imageshack.com/img923/1849/4TnLy1.png' />
                    <span>My favorite superhero is...</span>
                  </a>
                </div>
                <div className='q-ad-c'>
                  <a href='#' className='q-ad' id='add_q'>
                    <i className='fas fa-plus'></i>
                    <span>Add Answer</span>
                  </a>
                </div>
              </div>
            </div>
            <div id='t-box'>
              <a href='#'>Privacy</a> <a href='#'>Terms</a>{' '}
              <a href='#'>Advertising</a> <a href='#'>Ad Choices</a>{' '}
              <a href='#'>Cookies</a>{' '}
              <span id='t-more'>
                More <i className='fas fa-angle-down'></i>
              </span>
              <div id='cpy-nt'>
                Facebook &copy; <span id='curr-year'></span>
              </div>
            </div>
          </div>
          <div className='td' id='m-col'>
            <div className='m-mrg' id='p-tabs'>
              <div className='tb'>
                <div className='td'>
                  <div className='tb' id='p-tabs-m'>
                    <div className='td active'>
                      <i className='fas fa-hourglass-end'></i>
                      <span>TIMELINE</span>
                    </div>
                    <div className='td'>
                      <i className='fas fa-users'></i>
                      <span>FRIENDS</span>
                    </div>
                    <div className='td'>
                      <i className='fas fa-images'></i>
                      <span>PHOTOS</span>
                    </div>
                    <div className='td'>
                      <i className='fas fa-info-circle'></i>
                      <span>ABOUT</span>
                    </div>
                    <div className='td'>
                      <i className='fas fa-archive'></i>
                      <span>ARCHIVE</span>
                    </div>
                  </div>
                </div>
                <div className='td' id='p-tab-m'>
                  <i className='fas fa-angle-down'></i>
                </div>
              </div>
            </div>
            <div className='m-mrg' id='composer'>
              <div id='c-tabs-cvr'>
                <div className='tb' id='c-tabs'>
                  <div className='td active'>
                    <Link to='/createpost'>
                      <i className='fas fa-comment'></i>
                    </Link>
                    <span>Make Post</span>
                  </div>

                  <div className='td'>
                    <i className='fas fa-camera'></i>
                    <span>Photo/Video</span>
                  </div>
                  <div className='td'>
                    <i className='fas fa-video'></i>
                    <span>Live Video</span>
                  </div>
                  <div className='td'>
                    <i className='fas fa-heartbeat'></i>
                    <span>Life Event</span>
                  </div>
                </div>
              </div>
              <div id='c-c-main'>
                <div className='tb'>
                  <div className='td' id='p-c-i'>
                    <img
                      src={state ? state.pic : 'loading'}
                      alt='Profile pic'
                      className='.globalRoundProfile'
                    />
                  </div>
                  <div className='td' id='c-inp'>
                    <input type='text' placeholder="What's on your mind?" />
                  </div>
                </div>
                <div id='insert_emoji'>
                  <i className='fas fa-grin-stars'></i>
                </div>
              </div>
            </div>
            {profile.length ? (
              profile
                .map((item) => {
                  return (
                    <div className='mainPosts' key={item._id}>
                      <div className='title'>
                        <div className='profile'>
                          <div
                          // className='globalRoundProfile'
                          // style={{
                          //   backgroundImage: `url("/assets/img/1.jpg")`,
                          // }}
                          >
                            <img
                              src={state ? state.pic : 'loading'}
                              className='globalRoundProfile'
                            />
                            <span></span>
                          </div>

                          <div className='name'>
                            <Link to='#'>{item.postedBy.name}</Link>
                            <span>
                              1h <i className='fas fa-globe-americas'></i>
                            </span>
                          </div>
                        </div>
                        <i className='fas fa-ellipsis-h'></i>
                      </div>

                      <div className='description'>{item.title}</div>

                      <div className='post'>
                        <img src={item.photo} alt='' />
                      </div>

                      <div className='reaction'>
                        <div className='icons'>
                          <div className='svg'>
                            <img src='/assets/svg/like.svg' alt='' />
                          </div>
                          <div className='svg'>
                            <img src='/assets/svg/heart.svg' alt='' />
                          </div>
                          <div className='svg'>
                            <img src='/assets/svg/care.svg' alt='' />
                          </div>

                          <Link to='#'>{item.likes.length}</Link>
                        </div>
                        <div className='comment_length'>
                          <p>{item.comments.length} Comments</p>
                        </div>
                      </div>

                      <div className='likeShare'>
                        <span>
                          <div className='svg'>
                            {item.likes.includes(state._id) ? (
                              <img
                                src='/assets/svg/dislike.png'
                                style={{ width: '16px', marginLeft: '14px' }}
                                alt=''
                                onClick={() => unlikePost(item._id)}
                              />
                            ) : (
                              <img
                                src='/assets/svg/like_light.svg'
                                alt=''
                                onClick={() => likePost(item._id)}
                              />
                            )}
                          </div>
                          <h3>Like</h3>
                        </span>
                        <span onClick={() => setComment(!comment)}>
                          <div className='svg'>
                            <img src='/assets/svg/comment.svg' alt='' />
                          </div>
                          <h3>Comment</h3>
                        </span>
                        <span>
                          <div className='svg'>
                            <img src='/assets/svg/share.svg' alt='' />
                          </div>
                          <h3>Share</h3>
                        </span>
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          commentPost(e.target[0].value, item._id)
                          e.target[0].value = ''
                        }}
                      >
                        <div
                          className={comment ? 'comments' : 'comments_active'}
                        >
                          {item.comments.map((z) => (
                            <div className='old_comment' key={z._id}>
                              <div
                                className='globalRoundComment '
                                style={{
                                  marginTop: '2px',

                                  backgroundImage: `url("/assets/img/4.jpg")`,
                                }}
                              ></div>
                              <div className='comment_input'>
                                <b>{item.postedBy.name}</b>
                                <p>{z.text}</p>
                              </div>
                            </div>
                          ))}

                          <div className='new_comment'>
                            <div className='option '>
                              <input type='text' id='myfile'></input>
                              <ul className='list'>
                                <li>
                                  <label htmlFor='myfile'>
                                    <img
                                      src='/assets/icons/gallery.svg'
                                      alt='gallery'
                                    />
                                  </label>
                                </li>
                                <li>
                                  <img
                                    src='/assets/icons/tag.svg'
                                    alt='gallery'
                                  />
                                </li>
                                <li>
                                  <img
                                    src='/assets/icons/emoji.svg'
                                    alt='gallery'
                                  />
                                </li>
                                <li>
                                  <img
                                    src='/assets/icons/mic.svg'
                                    alt='gallery'
                                  />
                                </li>
                                <li>
                                  <img
                                    src='/assets/icons/more.svg'
                                    alt='gallery'
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )
                })
                .reverse()
            ) : (
              <div className='not_posts'>
                <h5> No posts availiable</h5>
              </div>
            )}
          </div>

          <div className='td' id='r-col'>
            <div id='chat-bar'>
              <div className='sidebar right'>
                <div className='containerr borderNone'>
                  <div className='mainTitle'>
                    <h3 className='padding'>Your Pages</h3>
                    <i className='fas fa-ellipsis-h'></i>
                  </div>

                  <div className='globalProfile'>
                    <div>
                      <img
                        src={state ? state.pic : 'loading'}
                        className='globalRoundProfile'
                      />
                    </div>
                    <Link to='/profile'>
                      <div className='name'>My Page</div>
                    </Link>
                  </div>

                  <div className='globalProfile globalProfileSmall'>
                    <div className='svg'>
                      <img src='/assets/svg/bellLight.svg' alt='' />
                    </div>
                    <div className='name'>25 Notifications</div>
                  </div>

                  <div className='globalProfile globalProfileSmall'>
                    <div className='svg'>
                      <img src='/assets/svg/megaphone.svg' alt='' />
                    </div>
                    <div className='name'>Create Promotion</div>
                  </div>
                </div>

                <div className='containerr'>
                  <div className='mainTitle'>
                    <h3 className='padding'>Contacts</h3>
                    <div className='items icons'>
                      <i className='fas fa-video'></i>
                      <i className='fas fa-search'></i>
                      <i className='fas fa-ellipsis-h'></i>
                    </div>
                  </div>

                  <div className='globalProfile'>
                    <div
                      className='globalRoundProfile'
                      style={{ backgroundImage: `url(/assets/img/1.jpg)` }}
                    >
                      <div className='active'></div>
                    </div>
                    <div className='name'>Honey Rangel</div>
                  </div>

                  <div className='globalProfile'>
                    <div
                      className='globalRoundProfile'
                      style={{ backgroundImage: `url(/assets/img/2.jpg)` }}
                    >
                      <div className='active'></div>
                    </div>
                    <div className='name'>Elisa Maddox</div>
                  </div>

                  <div className='globalProfile'>
                    <div
                      className='globalRoundProfile'
                      style={{ backgroundImage: `url(/assets/img/3.jpg)` }}
                    >
                      <div className='active'></div>
                    </div>
                    <div className='name'>Dawson Mason</div>
                  </div>

                  <div className='globalProfile'>
                    <div
                      className='globalRoundProfile'
                      style={{ backgroundImage: `url(/assets/img/4.jpg)` }}
                    >
                      <div className='active'></div>
                    </div>
                    <div className='name'>Ira Gordon</div>
                  </div>

                  <div className='globalProfile'>
                    <div
                      className='globalRoundProfile'
                      style={{ backgroundImage: `url(/assets/img/5.jpg)` }}
                    >
                      <div className='active'></div>
                    </div>
                    <div className='name'>Adam Cobb</div>
                  </div>

                  <div className='globalProfile'>
                    <div
                      className='globalRoundProfile'
                      style={{ backgroundImage: `url(/assets/img/6.jpg)` }}
                    >
                      <div className='active'></div>
                    </div>
                    <div className='name'>Sommer Lawrence</div>
                  </div>

                  <div className='globalProfile'>
                    <div
                      className='globalRoundProfile'
                      style={{ backgroundImage: `url(/assets/img/7.jpg)` }}
                    >
                      <div className='active'></div>
                    </div>
                    <div className='name'>Nojus Cantu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {edit ? (
          <div className='models_container' onClick={(e) => setEdit(false)}>
            <div
              className='models_content'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='close'>
                <h5> Change Your Account </h5>
                <p href='!#' onClick={() => setEdit(false)}>
                  X
                </p>
              </div>
              <div className='editAccount'>
                <div className='file-field input-field'>
                  <div>
                    <i
                      className='fas fa-image'
                      style={{ marginLeft: '1rem' }}
                    ></i>
                    <input
                      type='file'
                      placeholder='Edit image'
                      onChange={(e) => updatePhoto(e.target.files[0])}
                    />
                  </div>
                  <div className='file-path-wrapper'></div>
                </div>
                <div className='input-field col s6'>
                  <i className='fas fa-user'></i>
                  <input
                    id='icon_prefix'
                    type='text'
                    className='validate'
                    onChange={(e) => setMyName(e.target.value)}
                  />
                  <label for='icon_prefix' style={{ marginLeft: '4rem' }}>
                    First Name
                  </label>
                </div>
                <button className='btn' onClick={() => editProfile()}>
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
