const discordJS = require('discord.js');

module.exports = {
    commands: 'ban',
    description: 'Bans a member from the guild.',
    cooldown: 5,
    requiredRoles: ['Moderator'],
    callback: async (message, arguments) => {
        if (!arguments[0]) return message.reply('You need to provide the User\'s ID.');

        const memberToBan = message.guild.members.cache.get(arguments[0]);
        if (!memberToBan) return message.channel.send('I cannot seem to find this User inside of this guild.');

        if (!memberToBan.bannable) return message.channel.send('The User you are attempting to ban is not bannable.');
        if (memberToBan === message.author.id) return message.channel.send('You cannot attempt to ban yourself.');

        const banReason = arguments.slice(1).join(' ');
        if (!banReason) return message.reply('You need to provide a reason for this ban.');

        const modLogsChannel = message.guild.channels.cache.get('779355465711878197');

        const banEmbed = new discordJS.MessageEmbed()
        .setTitle('Member Banned')
        .setColor('GREEN')
        .setThumbnail(memberToBan.user.displayAvatarURL())
        .addFields(
            {
                name: 'Member:',
                value: memberToBan.user.tag
            },
            {
                name: 'Reason:',
                value: banReason
            },
            {
                name: 'Moderator:',
                value: message.author.tag
            }
        )

        memberToBan.send(banEmbed);

        try {
            message.guild.members.ban(memberToBan, { banReason })
        } catch(error) {
            console.log(error);
        }

        modLogsChannel.send(banEmbed);
    }
}