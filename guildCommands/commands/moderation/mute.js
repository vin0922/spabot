const discordJS = require('discord.js');
const ms = require('ms');

module.exports = {
    commands: 'mute',
    description: 'Mutes a member from inside of the guild.',
    cooldown: 5,
    requiredRoles: ['Moderator'],
    callback: async (message, arguments) => {
        if (!arguments[0]) return message.reply('You need to provide the User\'s ID.');

        const memberToMute = message.guild.members.cache.get(arguments[0]);
        if (!memberToMute) return message.channel.send('I cannot seem to find this User inside of this guild.');

        const muteTime = arguments[1];
        if (!muteTime) return message.reply('You need to provide a time for this mute.');

        if (
            muteTime.endsWith('d') &&
            muteTime.endsWith('h') &&
            muteTime.endsWith('s')
        )

        return message.channel.send('The time for this mute must be minutes.');

        const muteReason = arguments.slice(2).join(' ');
        if (!muteReason) return message.reply('You need to provide a reason for this mute.');

        message.delete();

        const muteRole = message.guild.roles.cache.get('779355463695073294');
        const memberRole = message.guild.roles.cache.get('779355463782367252');

        const modLogsChannel = message.guild.channels.cache.get('779355465711878197');

        const muteEmbed = new discordJS.MessageEmbed()
        .setTitle('Member Muted')
        .setThumbnail(memberToMute.user.displayAvatarURL())
        .setColor('GREEN')
        .addFields(
            {
                name: 'Member:',
                value: memberToMute.user.tag
            },
            {
                name: 'Reason:',
                value: muteReason
            },
            {
                name: 'Moderator:',
                value: message.author.tag
            }
        )

        memberToMute.send(`You've been muted inside of: **${message.guild.name}**. Check below to see why.`, { embed: muteEmbed })
        modLogsChannel.send(muteEmbed);
        message.channel.send(`Successfully muted that Member.`);
        memberToMute.roles.remove(memberRole);
        memberToMute.roles.add(muteRole);
        if (muteTime.endsWith('m')) {
            setTimeout(() => {
                memberToMute.roles.add(memberRole);
                memberToMute.roles.remove(muteRole);
            }, ms(muteTime));
        } else if (muteTime.includes('p')) {
            console.log('This is a permanent mute.');
        }
    }
}