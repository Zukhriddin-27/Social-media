import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import './style/profile.css'
export default function Profile() {
  const [profile, setProfile] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [comment, setComment] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    fetch('/getsubspost', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'zuxriddin ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.posts)
        console.log(result)
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
  console.log(profile)

  return (
    <div>
      <div className='sideBarContainerr'>
        <div className='sidebars left'>
          <div className='containerr borderNone'>
            <div className='globalProfile'>
              <div>
                <img
                  src={state ? state.pic : 'loading'}
                  className='globalRoundProfile'
                />
              </div>
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
              <a href='#'>Edit</a>
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
              <div className='svg'>
                <img src='/assets/svg/plusWhite.svg' alt='Create Story' />
              </div>
              <h3>
                Create Link <br /> Story
              </h3>
            </div>
            <div className='bg'>
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
        {profile
          .map((item) => {
            return (
              <div className='mainPosts' key={item._id}>
                <div className='title'>
                  <div className='profile'>
                    <div>
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
                    <Link to='#'>{profile ? item.likes.length : '0'}</Link>
                  </div>
                  <div className='comment_length'>
                    <p>{profile ? item.comments.length : '0'} Comments</p>
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
    </div>
  )
}
