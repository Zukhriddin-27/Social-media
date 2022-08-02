const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/key')
const loginMiddleware = require('../middleware/login')

router.post('/signup', (req, res) => {
  const { name, email, password, pic } = req.body
  if (!name || !email || !password) {
    res.status(422).json({ error: 'Please add all the fields' })
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: 'User already exists with that email' })
    }

    bcrypt.hash(password, 10).then((hashPassword) => {
      const user = new User({
        name,
        email,
        password: hashPassword,
        pic,
      })
      user
        .save()
        .then((user) => {
          res.json({ msg: 'Added successfully' })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  })
})

router.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(422).json({ error: 'Please add all the fields' })
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      res.status(422).json({ error: 'Invalid email or password' })
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ msg: 'Successfully signed in' })
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
          const { _id, name, email, followers, following, pic } = savedUser
          res.json({
            token: token,
            user: { _id, name, email, followers, following, pic },
          })
        } else {
          return res.status(422).json({ error: 'Invalid  password' })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  })
})

module.exports = router
