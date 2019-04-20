const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./auth/routes')
const playlistRouter = require('./playlists/routes')
const songRouter = require('./songs/routes')
const userRouter = require('./users/routes')
const artistRouter = require('./artists/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(authRouter)
  .use(playlistRouter)
  .use(songRouter)
  .use(userRouter)
  .use(artistRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))
