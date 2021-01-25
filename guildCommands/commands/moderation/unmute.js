const discordJS = require('discord.js');

module.exports = {
    commands: 'unmute',
    description: 'Unmutes a member from inside of the guild.',
    cooldown: 5,
    requiredRoles: ['Moderator'],
    callback: async (message, arguments) => {
        if (!arguments[0]) return message.reply('You need to provide the User\'s ID.');

        const memberToUnmute = message.guild.members.cache.get(arguments[0]);
        if (!memberToUnmute) return message.channel.send('I cannot seem to find this User inside of this guild.');

        message.delete();

        const muteRole = message.guild.roles.cache.get('779355463695073294');
        const memberRole = message.guild.roles.cache.get('779355463782367252');

        const modLogsChannel = message.guild.channels.cache.get('779355465711878197');

        const unmuteEmbed = new discordJS.MessageEmbed()
        .setTitle('Member Unmuted')
        .setThumbnail(memberToUnmute.user.displayAvatarURL())
        .setColor('GREEN')
        .addFields(
            {
                name: 'Member:',
                value: memberToUnmute.user.tag
            },
            {
                name: 'Moderator:',
                value: message.author.tag
            }
        )

        modLogsChannel.send(unmuteEmbed);
        message.channel.send(`Successfully unmuted that Member.`);
        memberToUnmute.roles.remove(muteRole);
        memberToUnmute.roles.add(memberRole);
    }
}