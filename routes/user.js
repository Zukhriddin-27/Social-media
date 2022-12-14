const { Router, json } = require('express')
const router = Router()
const mongoose = require('mongoose')
const loginMiddleware = require('../middleware/login')
const Post = mongoose.model('Post')
const User = mongoose.model('User')

router.get('/user/:id', loginMiddleware, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate('postedBy', '_id name pic')
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err })
          }
          res.json({ user, posts })
        })
    })
    .catch((err) => {
      console.log(err)
      return res.status(404).json({ error: 'User not found' })
    })
})

router.put('/follow', loginMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err })
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        {
          new: true,
        }
      )
        .select('-password')
        .then((result) => res.json(result))
        .catch((err) => {
          return res.status(422).json({ error: err })
        })
    }
  )
})
router.put('/unfollow', loginMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        res.status(422).json({ error: err })
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        {
          new: true,
        }
      )
        .select('-password')
        .then((result) => res.json(result))
        .catch((err) => {
          return res.status(422).json({ error: err })
        })
    }
  )
})
router.put('/updatepic', loginMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ err: 'Picture can not posted' })
      }
      res.json(result)
    }
  )
})
router.put('/editname', loginMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: req.body.myName } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ err: 'Name can not posted' })
      }
      res.json(result)
    }
  )
})
router.post('/searchuser', (req, res) => {
  const userSearchPanel = new RegExp('^' + req.body.query)
  User.find({ name: { $regex: userSearchPanel } })
    .select('_id name email pic')
    .then((user) => res.json({ user }))
    .catch((e) => console.log(e))
})
module.exports = router
