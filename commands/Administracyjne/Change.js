const { MessageEmbed, UserFlags, MessageReaction, Message } = require("discord.js");
const fs = require('fs')
const config = require("../../config.json")

module.exports = {
    config: {
        name: "change",
        description: "ADMIN - Zmienianie nicku",
    },
    run: async (client, message, args) => {
        const minecraftusers = require(`../../data/users.json`)
        let user = message.author;
        let avatar = user.displayAvatarURL({size:1024});
        let nick2 = args[1];

        if (message.mentions.users.size) 
        if (message.member.roles.cache.has("ID")) {
            let member = message.mentions.users.first()
            if (member) {
                if(minecraftusers[member.id]) {
                    var nickname = minecraftusers[member.id].nickname
                    if (fs.existsSync(`./users/${minecraftusers[member.id].nickname}.capesystem`)) {
                        const changed = new MessageEmbed()
                            .setColor('#00ff00')
                            .setAuthor(`Zmiana nicku przebiegła pomyślnie!`, `https://minotar.net/bust/${nick2}`)
                            .setDescription(`Stary nick: **${nickname}**\nNowy nick: **${nick2}**`)
                            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
                        minecraftusers[member.id] = {
                            nickname: nick2
                        }
			message.channel.send(changed)
            .then(message => {
                message.delete({ timeout: 4000 })
              })
                    }
                }
            }
        } else {
            const changederror = new MessageEmbed()
                .setColor('#FF0000')
                .setAuthor(`⛔ Poprawne użycie: ${config["Konfiguracja"].prefix}change <ping> <nowy nick>`)
	    message.channel.send(changederror)
        .then(message => {
            message.delete({ timeout: 4000 })
          })
        }
    }
}

