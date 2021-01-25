const discordJS = require('discord.js');

module.exports = {
    commands: 'purge',
    description: 'Deletes a certain amount of messages inside of a channel in the guild.',
    cooldown: 5,
    requiredRoles: ['Moderator'],
    callback: async (message, arguments) => {
        const amount = arguments[0];
        if (!amount) return message.reply('You need to provide an amount.');

        if (isNaN(amount)) {
            return message.channel.send('That is not a proper number, please insert a proper number.');
        } else if (amount.includes('.')) {
            return message.channel.send('The amount cannot include: **"."**');
        }

        message.delete();

        const modLogsChannel = message.guild.channels.cache.get('779355465711878197');

        const purgeEmbed = new discordJS.MessageEmbed()
        .setTitle('Messages BulkDeleted')
        .setThumbnail(message.guild.iconURL())
        .setColor('GREEN')
        .addFields(
            {
                name: 'Where:',
                value: message.channel
            },
            {
                name: 'Amount:',
                value: `**"${amount}"** messages.`
            },
            {
                name: 'Moderator:',
                value: message.author.tag
            }
        )

        try {
            message.channel.bulkDelete(amount, true);
        } catch(error) {
            console.log(error);
        }

        modLogsChannel.send(purgeEmbed);
        message.channel.send(`BulkDeleted **"${amount}"** messages.`).then(m => m.delete({ timeout: 5000 }));
    }
}