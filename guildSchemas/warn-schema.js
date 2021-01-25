const mongoose = require('mongoose')

const warnSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  memberId: {
    type: String,
    required: true,
  },
  warnings: {
    type: [Object],
    required: true,
  },
})

module.exports = mongoose.model('warnings', warnSchema)