const mongo = require('@utils/mongo');
const warnSchema = require('@schemas/warn-schema');
const discordJS = require('discord.js');

module.exports = {
  commands: ['mywarnings', 'mw'],
  cooldown: 5,
  description: 'Lists your warning(s) in the guild.',
  callback: async (message, arguments, text) => {
    const memberToViewWarnings = message.author

    const guildId = message.guild.id
    const memberId = memberToViewWarnings.id

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          memberId,
        })

        let listWarningsEmbed = new discordJS.MessageEmbed()
          .setAuthor(`Previous warning(s) for ${memberToViewWarnings.tag}`, memberToViewWarnings.displayAvatarURL())
          .setColor('#f82c2c')

          if (await warnSchema.findOne({memberId})) {
            for (const warning of results.warnings) {
                const { author, timestamp, reason } = warning
    
               listWarningsEmbed.addField(`By: ${author} | **${new Date(
                  timestamp
                ).toLocaleDateString()}**`, reason);
              }

              message.author.send(listWarningsEmbed);
              return message.channel.send('I have sent you a DM with information about your previous warning(s)');
          } else {
            message.channel.send('I have sent you a DM with information about your previous warning(s)');
            return message.author.send('You have never been warned before.');
          }
          
      } finally {
        mongoose.connection.close()
      }
    })
  },
}