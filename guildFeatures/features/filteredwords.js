const { filteredWords } = require('@root/filter.json');

module.exports = (client) => {
    client.on('message', async (message) => {
        if (message.author.bot) return
        
        let confirmedWord = false;
        var i;
        for (i = 0;i < filteredWords.length; i++) {
            if (message.content.toLowerCase().includes(filteredWords[i].toLowerCase()))
            confirmedWord = true;
        }

        if (confirmedWord) {
            message.delete();
            return message.reply(`Watch your language. No fowl language, sexual or racial slurs allowed.`).then(msg => msg.delete({ timeout: 5000 }));
        }
    })
}