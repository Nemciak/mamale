const { MessageEmbed, VoiceBroadcast } = require("discord.js");
const { MessageButton } = require('discord-buttons')
const config = require("../../config.json");
const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
module.exports = async (client, message) => {
    let user = message.author;
    let avatar = user.displayAvatarURL({size:1024});

    if (message.channel.id == `${config["Opcje"].MachineChannelID}` && message.author.id !== `${config["Opcje"].BotID}`) {
        message.delete() 
    }

    const antilink = new MessageEmbed()
        .setColor("#FF0000")
        .setAuthor(`Discord Server's link detected! - ${message.author.tag}`, `${avatar}`)

    if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
        if (!message.member.roles.cache.has(`${config["Opcje"].TeamRoleID}`)) {
            message.delete() 
            message.channel.send(antilink)
            .then(message => {
                message.delete({ timeout: 10000 })
            })
        }
    }

    if (message.channel.id === `${config["Opcje"].SuggestionChannelID}` && message.author.id !== `${config["Opcje"].BotID}`) {
        message.delete();
        const suggest = new MessageEmbed()
            .setColor("#0073FB")
            .setAuthor(`Propozycja użytkownika: ${message.author.username}`, avatar)
            .setDescription(`${message.content}`)
            .setFooter(`Zareaguj ponizej!`, client.user.displayAvatarURL())
        message.reply({ embed: suggest })
        .then(message=> {
            message.react("✅")
            message.react("❌")
        })
    }

	if (message.channel.id === `${config["Opcje"].RateChannelID}`) {
		message.react("✅")
		message.react("❌")
	}
}
