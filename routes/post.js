const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
const loginMiddleware = require('../middleware/login')
const Post = mongoose.model('Post')

router.get('/allpost', loginMiddleware, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name pic')
    .then((posts) => {
      res.json({ posts })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/createpost', loginMiddleware, (req, res) => {
  const { title, body, pic } = req.body

  if (!title || !body || !pic) {
    return res.status(422).json({ eror: 'Pleased add all the fields' })
  }
  req.user.password = undefined
  const post = new Post({
    title: title,
    body: body,
    photo: pic,
    postedBy: req.user,
  })
  post
    .save()
    .then((result) => {
      res.json({ post: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/mypost', loginMiddleware, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', '_id, name pic')
    .then((myPost) => {
      res.json({ myPost })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/like', loginMiddleware, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    } else {
      res.json(result)
    }
  })
})

router.put('/unlike', loginMiddleware, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    } else {
      res.json(result)
    }
  })
})
router.put('/comments', loginMiddleware, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user,
  }
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate('comments.postedBy', '_id name pic')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err })
      } else {
        res.json(result)
      }
    })
})

router.delete('/deletepost/:postId', loginMiddleware, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err })
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result)
          })
          .catch((e) => {
            console.log(e)
          })
      }
    })
})
router.get('/getsubspost', loginMiddleware, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id, name pic')
    .populate('comments.postedBy', '_id name pic')
    .then((posts) => res.json({ posts }))
    .catch((e) => {
      console.log(e)
    })
})

module.exports = router
