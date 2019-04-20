const { Router } = require('express')
const Artist = require('./model')
const Song = require('../songs/model')
const Playlist = require('../playlists/model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/artists', (req, res, next) => {
  req.body.userId = req.user.id
  Artist
    .findAll({ where: { userId: req.user.id } })
    .then(artist => {
      res.send({ artist })
    })
    .catch(error => next(error))
})

router.get('/artists/:id', auth, (req, res, next) => {
  Artist
    .findByPk(req.params.id, { include: [Song, Playlist] })
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: `Artists does not exist`
        })
      }
      return res.send(artist)
    })
    .catch(error => next(error))
})

router.put('/playlists/:id/songs/:id', auth, (req, res, next) => {
  Artist
    .findByPk(req.params.id, { include: [Song, Playlist] })
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: `Artists does not exist`
        })
      }
      return artist.update(req.body).then(artist => res.send(artist))
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id/songs/:id', auth, (req, res, next) => {
  Artist
    .findByPk(req.params.id, { include: [Song, Playlist] })
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: `Artists does not exist`
        })
      }
      return artist.destroy()
        .then(() => res.send({
          message: `Artists was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router