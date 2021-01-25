const discordJS = require('discord.js');

module.exports = {
    commands: 'help',
    description: 'Provies a list of commands inside of the guild.',
    cooldown: 5,
    callback: async (message) => {
        const helpEmbed = new discordJS.MessageEmbed()
        .setTitle('Guild Commands')
        .setThumbnail(message.guild.iconURL())
        .setColor('GREEN')
        .addFields(
            {
                name: 'Information:',
                value: '``help``, ``mywarnings``, ``userinfo``',
            },
            {
                name: 'Moderation:',
                value: '``ban``, ``listwarnings``, ``mute``, ``purge``, ``unmute``, ``warn``'
            }
        )

        message.channel.send('I\'ve sent you an Embed inside of ours DMs, listing all of the commands inside of this guild.');
        return message.author.send(helpEmbed);
    }
}