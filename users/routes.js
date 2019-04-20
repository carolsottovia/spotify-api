const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/users', (req, res, next) => {
  User
    .create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      password_confirmation: bcrypt.hashSync(req.body.password, 10)
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User does not exist`
        })
      }
      return res.status(201).send(user)
    })
    .catch(error => next(error))
})

// router.get('/secret-endpoint', (req, res) => {
//   const auth = req.headers.authorization && req.headers.authorization.split(' ')
//   if (auth && auth[0] === 'Bearer' && auth[1]) {
//     try {
//       const data = toData(auth[1])
//       res.send({
//         message: 'Thanks for visiting the secret endpoint.',
//         data
//       })
//     }
//     catch (error) {
//       res.status(400).send({
//         message: `Error ${error.name}: ${error.message}`,
//       })
//     }
//   }
//   else {
//     res.status(401).send({
//       message: 'Please supply some valid credentials'
//     })
//   }
// })

module.exports = router