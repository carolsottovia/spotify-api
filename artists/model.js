const Sequelize = require('sequelize')
const sequelize = require('../db')
const Song = require('../songs/model')

const Artist = sequelize.define('artists', {
})

Artist.hasMany(Song)

module.exports = Artist