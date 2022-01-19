const { MessageEmbed, UserFlags, MessageReaction } = require("discord.js");
const fs = require('fs')
const config = require("../../config.json")

module.exports = {
    config: {
        name: "unregister",
        description: "Odrejestrowywanie użytkowników",
    },
    run: async (client, message, args) => {
        const minecraftusers = require(`../../data/users.json`)
        let user = message.author;
        let avatar = user.displayAvatarURL({size:1024});
        let nickname = minecraftusers[message.author.id].nickname
	if(!minecraftusers[message.author.id]) {
		minecraftusers[message.author.id] = {
			nickname: null
		}
	}

                         /// EMBEDY ///

        const polish_unr = new MessageEmbed() 
            .setColor('#00ff00')
            .setAuthor(`Odrejestrowano nick: ${nickname}`, `https://minotar.net/helm/${nickname}`)
            .setDescription(`Zostałeś odrejestrowany na nicku **${nickname}**, teraz musisz się zarejestrować od nowa!\n:no_entry: **Uwaga:** Wszystkie kosmetyki, pelerynki zostają na nicku, który odrejestrowałeś!`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
        const polish_already = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`⛔ Nie jesteś jeszcze zarejestrowany!`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());

                        /// EMBEDY ///

        if (message.channel.id == `${config["Opcje"].MachineChannelID}` && message.author.id !== `${config["Opcje"].BotID}`) {
                if (fs.existsSync(`./users/${nickname}.capesystem`)) {
                    delete minecraftusers[message.author.id].nickname
                    fs.unlinkSync(`./users/${nickname}.capesystem`)
                        message.reply({ embed: polish_unr })
                        .then(message => {
                        message.delete({ timeout: 3000 })
                        })
                } else {
                        message.reply({ embed: polish_already })
                        .then(message => {
                        message.delete({ timeout: 3000 })
                        })
                }
        }
    }
}
