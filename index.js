require('module-alias/register');

const discordJS = require('discord.js');
const client = new discordJS.Client();

const path = require('path');

const { token } = require('@root/config.json');

const loadCommands = require('@guildCommands/load-commands');
const commandBase = require('@guildCommands/command-base');
const loadFeatures = require('@guildFeatures/load-features');

const antiAd = require('@features/anti-ad');

client.once('ready', () => {
    console.log('SpaBot is now ready for their Spa.');

    commandBase.loadPrefixes(client);
    loadCommands(client);
    loadFeatures(client);

    antiAd(client);
}),

client.on('guildMemberAdd', async (member) => {
    const logsChannel = member.guild.channels.cache.get('781623467086053406');

    const welcomeEmbed = new discordJS.MessageEmbed()
    .setTitle('Member Joined')
    .setThumbnail(member.user.displayAvatarURL())
    .setColor('GREEN')
    .addFields(
        {
            name: 'Member:',
            value: member.user.tag
        },
        {
            name: 'ID:',
            value: member.user.id
        }
    )

    logsChannel.send(welcomeEmbed);
})

client.on('guildMemberRemove', async (member) => {
    const logsChannel = member.guild.channels.cache.get('781623467086053406');

    const leaveEmbed = new discordJS.MessageEmbed()
    .setTitle('Member Left')
    .setThumbnail(member.user.displayAvatarURL())
    .setColor('RED')
    .addFields(
        {
            name: 'Member:',
            value: member.user.tag
        },
        {
            name: 'ID:',
            value: member.user.id
        }
    )

    logsChannel.send(leaveEmbed);
})

client.login(token);