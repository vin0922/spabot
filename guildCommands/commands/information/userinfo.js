const discordJS = require('discord.js');

module.exports = {
    commands: 'userinfo',
    description: 'Displays the information about a User inside of the guild.',
    cooldown: 5,
    callback: async (message, arguments) => {
        const taggedMember = message.mentions.users.first() || message.author

        const userInfoEmbed = new discordJS.MessageEmbed()
        .setTitle('Member Information')
        .setThumbnail(taggedMember.displayAvatarURL())
        .setColor('GREEN')
        .setFooter(`Requested from: ${message.author.tag}`, message.author.displayAvatarURL())
        .addFields(
            {
                name: 'Username',
                value: taggedMember.username,
                inline: true
            },
            {
                name: 'ID:',
                value: taggedMember.id,
                inline: true
            },
            {
                name: 'Status:',
                value: taggedMember.presence.status,
                inline: true
            },
            {
                name: 'Game:',
                value: taggedMember.presence.game || 'Not playing a game currently',
                inline: true
            }
        )

        return message.channel.send(userInfoEmbed);
    }
}