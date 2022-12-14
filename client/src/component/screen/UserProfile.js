import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
import './style/userProfile.css'
export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [comment, setComment] = useState(false)
  // const [menu, setMenu] = useState(false)
  const { userId } = useParams()
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  )
  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result)

        setData(result.posts)
      })
    //eslint-disable-next-line
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
  // eslint-disable-next-line
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
  const followUser = () => {
    fetch('/follow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        })
        localStorage.setItem('user', JSON.stringify(data))
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          }
        })

        setShowFollow(!showFollow)
      })
  }
  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        })
        localStorage.setItem('user', JSON.stringify(data))
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (s) => s !== data._id
          )
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          }
        })
        setShowFollow(!showFollow)
      })
  }
  console.log(data)
  return (
    <>
      {profile ? (
        <main>
          <div id='profile-upper'>
            <div id='profile-banner-image'>
              {/* eslint-disable-next-line */}
              <img
                src='https://imagizer.imageshack.com/img921/9628/VIaL8H.jpg'
                alt='Banner image'
              />
            </div>
            <div id='profile-d'>
              <div id='profile-pic'>
                {/* eslint-disable-next-line */}
                <img src={data[0].postedBy.pic} />
              </div>
              <div id='u-name'>{profile ? profile.user.name : 'Loading'}</div>
              <div className='tb' id='m-btns'>
                <div className='td'>
                  <div className='m-btn'>
                    <i className=''>
                      {profile ? profile.user.followers.length : '0'}
                    </i>
                    {showFollow ? (
                      <span onClick={() => followUser()}> Follow</span>
                    ) : (
                      <span onClick={() => unfollowUser()}> Unfollow</span>
                    )}
                  </div>
                </div>
                <div className='td'>
                  <div className='m-btn'>
                    <i className=''>
                      {profile ? profile.user.following.length : '0'}
                    </i>
                    <span> Privacy</span>
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
                    <div id='u-occ'>
                      I love making applications with Angular.
                    </div>
                    <div id='u-loc'>
                      <i className='fas fa-map-marker-alt'></i>
                      {/* eslint-disable-next-line */}
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
                    {data.map((item) => {
                      return (
                        <div className='tb'>
                          <div className='tr'>
                            <div className='td'>
                              {/* eslint-disable-next-line */}
                              <img src={item.photo} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
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
                      {/* eslint-disable-next-line */}
                      <a href='#' className='q-ad'>
                        {/* eslint-disable-next-line */}
                        <img src='https://imagizer.imageshack.com/img923/1849/4TnLy1.png' />
                        <span>My favorite superhero is...</span>
                      </a>
                    </div>
                    <div className='q-ad-c'>
                      {/* eslint-disable-next-line */}
                      <a href='#' className='q-ad' id='add_q'>
                        <i className='fas fa-plus'></i>
                        <span>Add Answer</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div id='t-box'>
                  {/* eslint-disable-next-line */}
                  <a href='#'>Privacy</a> <a href='#'>Terms</a>{' '}
                  {/* eslint-disable-next-line */}
                  <a href='#'>Advertising</a> <a href='#'>Ad Choices</a>{' '}
                  {/* eslint-disable-next-line */}
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
                {data.length ? (
                  <>
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
                                  <Link to='#'>{item.postedBy.name}</Link>
                                  <span>
                                    1h <i className='fas fa-globe-americas'></i>
                                  </span>
                                </div>
                              </div>
                              <i className='fas fa-ellipsis-h'></i>
                            </div>

                            <div className='description'>{item.title}</div>

                            <div
                              className='posts'
                              style={{
                                height: 'auto',
                              }}
                            >
                              {/* <div className='menu_context '>
<ul className='menu_list'>
<li>Hide post</li>
<li>Report post</li>
<li>View edit history</li>
<li> Turn on notifications for this post</li>
<li>Copy link</li>
<li>Add to Favorites</li>
<a href='#delete'>
<li>Delete post</li>
</a>
</ul>
</div> */}
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

                                <Link to='#'>
                                  {data ? item.likes.length : '0'}
                                </Link>
                              </div>
                              <div className='comment_length'>
                                <p>
                                  {data ? item.comments.length : '0'} Comments
                                </p>
                              </div>
                            </div>

                            <div className='likeShare'>
                              <span>
                                <div className='svg'>
                                  {item.likes.includes(state._id) ? (
                                    <img
                                      src='/assets/svg/dislike.png'
                                      style={{
                                        width: '16px',
                                        marginLeft: '14px',
                                      }}
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
                                className={
                                  comment ? 'comments' : 'comments_active'
                                }
                              >
                                {item.comments.map((z) => (
                                  <div className='old_comment'>
                                    <div>
                                      {/* eslint-disable-next-line */}
                                      <img
                                        src={item.postedBy.pic}
                                        className='globalRoundComment '
                                      />
                                    </div>
                                    <div className='comment_input'>
                                      <b>{item.comments.name}</b>
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
                      .reverse()}
                    <div className='not_posts'>
                      <h6> No posts availiable</h6>
                    </div>
                  </>
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
          </div>
        </main>
      ) : (
        'Loading'
      )}
    </>
  )
}
