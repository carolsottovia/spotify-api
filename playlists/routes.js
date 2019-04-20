const { Router } = require('express')
const Playlist = require('./model')
const Song = require('../songs/model')
const auth = require('../auth/middleware')

const router = new Router()

router.post('/playlists', auth, (req, res, next) => {
  Playlist
    .create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlists does not exist`
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

router.get('/playlists', auth, (req, res, next) => {
  req.body.userId = req.user.id
  Playlist
    .findAll({ where: { userId: req.user.id } })
    .then(playlist => {
      res.send({ playlist })
    })
    .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findByPk(req.params.id, { include: [Songs] })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlists does not exist`
        })
      }
      return res.send(playlist)
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findByPk(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlists does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `Playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router