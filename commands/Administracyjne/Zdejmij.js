const { MessageEmbed, UserFlags, MessageReaction, Message } = require("discord.js");
const fs = require('fs')
const config = require("../../config.json")
const ROLE_PL = config["Opcje"].PolishRoleID;
const ROLE_EN = config["Opcje"].EnglishRoleID;

module.exports = {
    config: {
        name: "zdejmij",
        description: "ADMIN - Zdejmowanie kosmetyków",
    },
    run: async (client, message, args) => {
        const minecraftusers = require(`../../data/users.json`)
        let user = message.author;
        let avatar = user.displayAvatarURL({size:1024});
        let model = args[0];
        let nick = args[1];

                /// EMBEDY ///

        const usage = new MessageEmbed()
          .setColor('#FF0000') 
          .setAuthor(`⛔ Poprawne użycie: ${config["Konfiguracja"].prefix}zdejmij <MODEL> <NICK>`)
          .setDescription(`MODEL - np. wings\nNICK - np. derex_\nMODELID - np. nemo`)
          .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
        const zdjeto = new MessageEmbed()
            .setColor('#00ff00')
            .setAuthor(`✅ Zdjeto poprawnie!`)
            .setDescription(`Zdjeto: **${model}**\nZ nicku: **${nick}**\n`)
            .setThumbnail(`https://minotar.net/bust/${nick}/100.png`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
        const unregistered = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`⛔ Gracz o nicku ${nick} nie jest zarejestrowany!`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
        const log = new MessageEmbed()
          .setColor('#FF0000')
          .setAuthor(message.author.tag, avatar)
          .setDescription(`Model: **${model}**\nNickname: **${nick}**\n`)
          .setTimestamp(new Date())
          .setFooter(`Log zapisany z daty`, avatar)
        
                    /// EMBEDY ///
        message.delete()
        if (message.member.roles.cache.has(`${config["Opcje"].TeamRoleID}`)) {
            if (!args[0]) return message.reply({ embed: usage })
            .then(message => {
                message.delete({ timeout: 3000 })
            })
            if (!args[1]) return message.reply({ embed: usage })
            .then(message => {
                message.delete({ timeout: 3000 })
            })
            if (fs.existsSync(`./users/${nick}.capesystem`)) {
                client.channels.cache.get(`${config["Opcje"].LogChannelID}`).send({ embed: log })
                if (model === "all") {
                    if (fs.existsSync(`/var/www/html/items/wings_/users/${nick}.png`)) {
                        fs.unlinkSync(`/var/www/html/items/wings/users/${nick}.png`, (err) => {
                            if (err) throw err;
                        });
                    }
                    if (fs.existsSync(`/var/www/html/items/item/users/${nick}.png`)) {
                      fs.unlinkSync(`/var/www/html/items/item/users/${nick}.png`, (err) => {
                          if (err) throw err;
                      });
                    }
                    if (fs.existsSync(`/var/www/html/items/hat/users/${nick}.png`)) {
                        fs.unlinkSync(`/var/www/html/items/hat/users/${nick}.png`, (err) => {
                            if (err) throw err;
                        });
                    }
                    message.channel.send(zdjeto)    
                }
                if (model === "wings") {
                    if (fs.existsSync(`/var/www/html/items/wings/users/${nick}.png`)) {
                        fs.unlinkSync(`/var/www/html/items/wings/users/${nick}.png`, (err) => {
                            if (err) throw err;
                        });
                    }
                    message.reply(zdjeto) 
                    .then(message => {
                       message.delete({ timeout: 5000 })
                    }) 
                }
                if (model === "item") {
                    if (fs.existsSync(`/var/www/html/items/item/users/${nick}.png`)) {
                        fs.unlinkSync(`/var/www/html/items/item/users/${nick}.png`, (err) => {
                            if (err) throw err;
                        });
                    }
                    message.reply(zdjeto) 
                    .then(message => {
                       message.delete({ timeout: 5000 })
                    })   
                }
                if (model === "hat") {
                    if (fs.existsSync(`/var/www/html/items/hat/users/${nick}.png`)) {
                        fs.unlinkSync(`/var/www/html/items/hat/users/${nick}.png`, (err) => {
                            if (err) throw err;
                        });
                    }
                    message.reply(zdjeto) 
                    .then(message => {
                       message.delete({ timeout: 5000 })
                    })   
                }
            } else {
                message.channel.send(unregistered)
                .then(message => {
                   message.delete({ timeout: 5000 })
                }) 
            }
        }
  }
}
