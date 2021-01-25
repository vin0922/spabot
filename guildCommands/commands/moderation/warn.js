const mongo = require('@utils/mongo');
const warnSchema = require('@schemas/warn-schema');
const discordJS = require('discord.js');

module.exports = {
  commands: 'warn',
  minArgs: 2,
  cooldown: 5,
  description: 'Warns a member inside of the guild',
  requiredRoles: ['Moderator'],
  callback: async (message, arguments) => {
    if (!arguments[0]) return message.reply('You need to provide the Member\'s ID.');

    const memberToWarn = message.guild.members.cache.get(arguments[0]);
    if (!memberToWarn) return message.reply('I cannot find this member inside of this guild.');

    const modLogsChannel = message.guild.channels.cache.get('779355465711878197');

    const guildId = message.guild.id
    const memberId = memberToWarn.id
    const reason = arguments.slice(1).join(' ');

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    }

    const warnLogEmbed = new discordJS.MessageEmbed()
    .setTitle('Member Warned')
    .setThumbnail(memberToWarn.user.displayAvatarURL())
    .setColor('#f82c2c')
    .addFields(
      {
        name: 'Warned:',
        value: memberToWarn.user.tag
      },
      {
        name: 'Moderator:',
        value: message.author.tag
      },
      {
        name: 'Reason:',
        value: reason
      }
    )

    await mongo().then(async (mongoose) => {
      try {
        await warnSchema.findOneAndUpdate(
          {
            guildId,
            memberId,
          },
          {
            guildId,
            memberId,
            $push: {
              warnings: warning,
            },
          },
          {
            upsert: true,
          }
        )
      } finally {
        mongoose.connection.close()
      }
    })

    modLogsChannel.send(warnLogEmbed);
    memberToWarn.send(`You have been warned: **${message.guild.name}**. Check below to see why.`, {embed: warnLogEmbed});
    message.channel.send(`Successfully warned: **${memberToWarn.user.tag}**, for the following reason: **${reason}**.`)
  },
}
