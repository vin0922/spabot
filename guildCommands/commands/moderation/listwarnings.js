const mongo = require('@utils/mongo');
const warnSchema = require('@schemas/warn-schema');
const discordJS = require('discord.js');

module.exports = {
  commands: ['listwarnings', 'lw'],
  cooldown: 5,
  description: 'Lists the warning(s) from a member.',
  requiredRoles: ['Moderator'],
  callback: async (message, arguments, text) => {
    if (!arguments[0]) return message.reply('You need to provide the Member\'s to view their Warning(s)');

    const memberToViewWarnings = message.guild.members.cache.get(arguments[0]);
    if (!memberToViewWarnings) return message.reply('I cannot find this member inside of this guild.');

    const guildId = message.guild.id
    const memberId = memberToViewWarnings.id

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          memberId,
        })

        let listWarningsEmbed = new discordJS.MessageEmbed()
          .setAuthor(`Previous warning(s) for ${memberToViewWarnings.user.tag}`, memberToViewWarnings.user.displayAvatarURL())
          .setColor('#f82c2c')
          .setFooter(`Requested from: ${message.author.tag}`, message.author.displayAvatarURL())

          if (await warnSchema.findOne({memberId})) {
            for (const warning of results.warnings) {
                const { author, timestamp, reason } = warning
    
               listWarningsEmbed.addField(`By: ${author} | **${new Date(
                  timestamp
                ).toLocaleDateString()}**`, reason);
              }

              return message.channel.send(listWarningsEmbed);
          } else {
            message.channel.send('This member has never been warned before.')
          }
          
      } finally {
        mongoose.connection.close()
      }
    })
  },
}