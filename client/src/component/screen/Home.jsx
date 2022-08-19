import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

import './style/home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  const [data, setData] = useState([])
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext)
  const [comment, setComment] = useState(false)
  const [menu, setMenu] = useState(false)
  const [frends, setFrends] = useState(false)
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts)
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
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
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
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
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
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
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
        const newData = data.filter((s) => s._id !== result)
        setData(newData)
      })
      .catch((e) => console.log(e))
  }

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
  console.log(data)
  return (
    <div>
      <div className='sideBarContainerr'>
        <div className='sidebars left'>
          <div className='containerr borderNone'>
            <div className='globalProfile'>
              <a href='/profile'>
                <div>
                  {/* eslint-disable-next-line */}
                  <img
                    src={
                      state
                        ? state.pic
                        : 'https://res.cloudinary.com/dus2bqcc6/image/upload/v1660891415/72-729756_how-to-add-a-new-user-to-your.png-removebg-preview_tokryb.png'
                    }
                    className='globalRoundProfile'
                  />
                </div>
              </a>
              <div className='name'>{state ? state.name : 'Loading'}</div>
            </div>

            <div className='globalProfile'>
              <div
                className='globalRoundProfile'
                style={{ backgroundImage: `url(/assets/ico/1.png)` }}
              ></div>
              <div className='name'>COVID-19 info center</div>
            </div>
            <div className='globalProfile'>
              <div
                className='globalRoundProfile'
                style={{ backgroundImage: `url(/assets/ico/2.png)` }}
              ></div>
              <div className='name'>Pages</div>
            </div>
            <div className='globalProfile'>
              <div
                className='globalRoundProfile'
                style={{ backgroundImage: `url(/assets/ico/3.png)` }}
              ></div>
              <div className='name'>Friends</div>
            </div>
            <div className='globalProfile'>
              <div
                className='globalRoundProfile'
                style={{ backgroundImage: `url(/assets/ico/4.png)` }}
              ></div>
              <div className='name'>Messenger</div>
            </div>
            <div className='globalProfile'>
              <div className='globalRoundProfile circle'>
                <i className='fas fa-angle-down'></i>
              </div>
              <div className='name'>See More</div>
            </div>
          </div>

          <div className='containerr'>
            <div className='mainTitle'>
              <h3 className='padding'>Your Shortcuts</h3>
            </div>
            <div className='globalProfile'>
              <div
                className='globalRoundProfile r-10'
                style={{ backgroundImage: `url(/assets/img/code1.jpg)` }}
              ></div>
              <div className='name'>Html Css Javascript</div>
            </div>
            <div className='globalProfile'>
              <div
                className='globalRoundProfile r-10'
                style={{ backgroundImage: `url(/assets/img/code2.jpg)` }}
              ></div>
              <div className='name'>Tutorials</div>
            </div>
            <div className='globalProfile'>
              <div
                className='globalRoundProfile r-10'
                style={{ backgroundImage: `url(/assets/img/code3.jpg)` }}
              ></div>
              <div className='name'>Coding</div>
            </div>
            <div className='globalProfile'>
              <div
                className='globalRoundProfile r-10'
                style={{ backgroundImage: `url(/assets/img/code4.jpg)` }}
              ></div>
              <div className='name'>VueJS</div>
            </div>
            <div className='globalProfile'>
              <div className='globalRoundProfile circle'>
                <i className='fas fa-angle-down'></i>
              </div>
              <div className='name'>See More</div>
            </div>
          </div>
        </div>

        <div className='sidebar right'>
          <div className='containerr borderNone'>
            <div className='mainTitle'>
              <h3 className='padding'>Your Pages</h3>
              <i className='fas fa-ellipsis-h'></i>
            </div>

            <div className='globalProfile'>
              <div>
                {/* eslint-disable-next-line */}
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
      <div className='sectionCenter'>
        <div className='story'>
          <div className='cover'>
            <div className='create'>
              <div className='svg' onClick={() => setEdit(true)}>
                <img src='/assets/svg/plusWhite.svg' alt='Create Story' />
              </div>
              <h3>
                Create Link <br /> Story
              </h3>
            </div>
            <div className='bg'>
              {/* eslint-disable-next-line */}
              <img src={state ? state.pic : 'loading'} />
              <span></span>
            </div>
          </div>

          <div className='cover'>
            <div className='pro'>
              <div
                className='globalRoundProfile'
                style={{
                  backgroundImage: `url("/assets/img/2.jpg")`,
                }}
              ></div>
            </div>
            <h3>FilipCodes YT</h3>
            <div
              className='bg'
              style={{
                backgroundImage: `url("/assets/img/3.jpg")`,
              }}
            >
              <span></span>
            </div>
          </div>
          <div className='cover'>
            <div className='pro'>
              <div
                className='globalRoundProfile'
                style={{
                  backgroundImage: `url("/assets/img/4.jpg")`,
                }}
              ></div>
            </div>
            <h3>User Name</h3>
            <div
              className='bg'
              style={{
                backgroundImage: `url("/assets/img/5.jpg")`,
              }}
            >
              <span></span>
            </div>
          </div>
          <div className='cover'>
            <div className='pro'>
              <div
                className='globalRoundProfile'
                style={{
                  backgroundImage: `url("/assets/img/6.jpg")`,
                }}
              ></div>
            </div>
            <h3>User Name</h3>
            <div
              className='bg'
              style={{
                backgroundImage: `url("/assets/img/7.jpg")`,
              }}
            >
              <span></span>
            </div>
          </div>
          <div className='cover'>
            <div className='pro'>
              <div
                className='globalRoundProfile'
                style={{
                  backgroundImage: `url("/assets/img/8.jpg")`,
                }}
              ></div>
            </div>
            <h3>User Name</h3>
            <div
              className='bg'
              style={{
                backgroundImage: `url("/assets/img/9.jpg")`,
              }}
            >
              <span></span>
            </div>
          </div>
          <div className='cover'>
            <div className='pro'>
              <div
                className='globalRoundProfile'
                style={{
                  backgroundImage: `url("/assets/img/10.jpg")`,
                }}
              ></div>
            </div>
            <h3>User Name</h3>
            <div
              className='bg'
              style={{
                backgroundImage: `url("/assets/img/11.jpg")`,
              }}
            >
              <span></span>
            </div>
          </div>
        </div>

        <div className='createPost'>
          <div className='input'>
            <div>
              {/* eslint-disable-next-line */}
              <img
                src={state ? state.pic : 'loading'}
                className='globalRoundProfile'
              />
              <span></span>
            </div>
            <div className='post'>What's on your mind, FilipCodes YT?</div>
          </div>

          <div className='buttons'>
            <span>
              <div className='svg'>
                <img src='/assets/svg/live_video.svg' alt='' />
              </div>
              <h4>Live Video</h4>
            </span>
            <span>
              <div className='svg'>
                <img src='/assets/svg/photo.svg' alt='' />
              </div>
              <h4>Photo/Video</h4>
            </span>
            <span>
              <div className='svg'>
                <img src='/assets/svg/smile.svg' alt='' />
              </div>
              <h4>Feeling/Activity</h4>
            </span>
          </div>
        </div>

        <div className='rooms'>
          <div className='title'>
            <div className='left'>
              <i className='fas fa-video'></i>
              <h3>Rooms</h3>
              <p>Video chat with friends</p>
              <i className='fas fa-exclamation-circle'></i>
            </div>
            <div className='right'>
              <Link to='#'>Create Room</Link>
            </div>
          </div>
          <div className='profiles'>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/1.jpg")`,
              }}
            >
              <div className='svg'>
                <img src='/assets/svg/plusWhite.svg' alt='' />
              </div>
              <span></span>
              <div className='darkSpan'></div>
            </div>

            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/2.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/3.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/4.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/5.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/6.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/7.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/8.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/9.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/10.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/11.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/12.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
            <div
              className='globalRoundProfile'
              style={{
                backgroundImage: `url("/assets/img/1.jpg")`,
              }}
            >
              <span></span>
              <div className='active'></div>
            </div>
          </div>
        </div>
        {data
          .map((item) => {
            return (
              <div className='mainPosts' key={item._id}>
                <div className='title'>
                  <div className='profile'>
                    <div>
                      {/* eslint-disable-next-line */}
                      <img
                        src={item.postedBy.pic}
                        className='globalRoundProfile'
                      />
                      <span></span>
                    </div>

                    <div className='name'>
                      <Link
                        to={
                          item.postedBy._id !== state._id
                            ? '/profile/' + item.postedBy._id
                            : '/profile'
                        }
                      >
                        {item.postedBy.name}
                      </Link>
                      <span>
                        1h <i className='fas fa-globe-americas'></i>
                      </span>
                    </div>
                  </div>
                  <i
                    className='fas fa-ellipsis-h'
                    onClick={() => setMenu(!menu)}
                  ></i>
                </div>

                <div className='description'>{item.body}</div>

                <div
                  className='post'
                  style={{
                    height: 'auto',
                  }}
                >
                  <div className='menu_context '>
                    <ul
                      className={menu ? 'menu-list' : 'menu-list menu-active'}
                    >
                      <li>Hide post</li>
                      <li>Report post</li>
                      <li>View edit history</li>
                      <li> Turn on notifications for this post</li>
                      <li>Copy link</li>
                      <li>Add to Favorites</li>
                      <a href='#delete'>
                        {item.postedBy._id === state._id && (
                          <li onClick={() => deletePosts(item._id)}>
                            Delete post
                          </li>
                        )}
                      </a>
                    </ul>
                  </div>
                  <img
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    src={item.photo}
                    alt=''
                  />
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
                    <Link to='#'>{data ? item.likes.length : '0'}</Link>
                  </div>
                  <div className='comment_length'>
                    <p>{data ? item.comments.length : '0'} Comments</p>
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
                  <div className={comment ? 'comments' : 'comments_active'}>
                    {item.comments.map((item) => (
                      <div className='old_comment' key={item._id}>
                        <div>
                          {/* eslint-disable-next-line */}
                          <img
                            src={item.postedBy.pic}
                            className='globalRoundComment '
                          />
                        </div>
                        <div className='comment_input'>
                          <b>{item.postedBy.name}</b>
                          <p>{item.text}</p>
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
                    </div>
                  </div>
                </form>
              </div>
            )
          })
          .reverse()}
      </div>
      {edit ? (
        <div className='models_container' onClick={(e) => setEdit(false)}>
          <div className='models_content' onClick={(e) => e.stopPropagation()}>
            <div
              className={frends ? 'container_posts active' : 'container_posts'}
            >
              <div className='wrapper'>
                <section className='post'>
                  <header>Create Post</header>
                  <form action='#'>
                    <div className='content'>
                      <img src='/assets/icons/logo.png' alt='logo' />
                      <div className='details'>
                        <p>Coding Nepal</p>
                        <div className='privacy'>
                          <i className='fas fa-user-friends'></i>
                          <span onClick={() => setFrends(!frends)}>
                            Friends
                          </span>
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
                            <img
                              src='/assets/icons/gallery.svg'
                              alt='gallery'
                            />
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
                      <h6 onClick={() => setEdit(false)}>Post</h6>
                    </button>
                  </form>
                </section>
                <section className='audience'>
                  <header>
                    <div
                      className='arrow-back'
                      onClick={() => setFrends(!frends)}
                    >
                      <i className='fas fa-arrow-left'></i>
                    </div>
                    <p>Select Audience</p>
                  </header>
                  <div className='content'>
                    <p>Who can see your post?</p>
                    <span>
                      Your post will show up in News Feed, on your profile and
                      in search results.
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
        </div>
      ) : null}
    </div>
  )
}
