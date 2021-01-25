const { connect } = require("mongoose")

const disallowedChannels = [
  "779355464202059790",
  "779355464202059792",
  "779355464202059788",
  "779355464202059791",
  "779895179096096768",
  "779355464499593217",
  "779355464499593219",
  "779355464499593220",
  "779355464499593221",
  "779355464499593223",
  "779769318443188265",
  "786263665434427393",

]

const allowedChannels = [
  "779355464915746853",
  "779355464915746854",
  "779355464915746855",
  "779355465154560010",
  "779355465154560011",
  "779355465154560012",
  "780513584404103178",
  "780450241853522011",
  "779355465154560017",
  "779355465154560018",
  "779355465305292812",
  "779355465305292810",
  "779355465305292811",
  "779355465305292814",
  "779355465305292815",
  "779355465305292816",
  "779355465305292817",
  "779355465305292818",
  "779355465305292819",
  "779355465455894528",
  "779355465455894529",
  "779355465455894530",
  "779355465455894532",
  "779355465455894533",
  "779355465455894534",
]

module.exports = (client) => {
    const isInvite = async (guild, code) => {
      return await new Promise((resolve) => {
        guild.fetchInvites().then((invites) => {
          for (const invite of invites) {
            if (code === invite[0]) {
              resolve(true)
              return
            }
          }
  
          resolve(false)
        })
      })
    }
  
    client.on('message', async (message) => {
      const bot = message.author.bot

      const { guild, member, content } = message
  
      const code = content.split('discord.gg/')[1]

      const channel = message.channel.id
  
      if (content.includes('discord.gg/')) {
        if (disallowedChannels.includes(channel)) {
          console.log('True')
          if (bot) return;

          const isOurInvite = await isInvite(guild, code)
          if (!isOurInvite) {
            message.delete();
          }
        } else if (allowedChannels.includes(channel)) {
          console.log('False')
        } 
      }
    })
  }