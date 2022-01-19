const { MessageEmbed, UserFlags, MessageReaction, Message } = require("discord.js");
const fs = require('fs')
const config = require("../../config.json")

module.exports = {
    config: {
        name: "nadaj",
        description: "ADMIN - Nadawanie kosmetyków",
    },
    run: async (client, message, args) => {
        const minecraftusers = require(`../../data/users.json`)
        let user = message.author;
        let avatar = user.displayAvatarURL({size:1024});
        let model = args[0];
        let nick = args[1];
        let modelid = args[2];

                /// EMBEDY ///

        const usage = new MessageEmbed()
          .setColor('#FF0000') 
          .setAuthor(`⛔ Poprawne użycie: ${config["Konfiguracja"].prefix}nadaj <MODEL> <NICK> <MODELID>`)
          .setDescription(`MODEL - np. wings\nNICK - np. derex_\nMODELID - np. nemo`)
          .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
        const gived = new MessageEmbed()
            .setColor('#00ff00')
            .setAuthor(`✅ Nadano poprawnie!`)
            .setDescription(`Nadano: **${model}**\nNa nick: **${nick}**\nID: **${modelid}**`)
            .setThumbnail(`https://minotar.net/bust/${nick}/100.png`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
        const unregistered = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`⛔ Gracz o nicku ${nick} nie jest zarejestrowany!`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
        const errorid = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`⛔ Nie ma takiego ID jak ${modelid}`)
        const log = new MessageEmbed()
          .setColor('#00ff00')
          .setAuthor(message.author.tag, avatar)
          .setDescription(`Model: **${model}**\nNickname: **${nick}**\nID: **${modelid}**`)
          .setTimestamp(new Date())
          .setFooter(`Log zapisany z daty`, avatar)

        
                    /// EMBEDY ///
        message.delete()
        if (message.member.roles.cache.has(`${config["Opcje"].TeamRoleID}`)) {
            client.channels.cache.get(`${config["Opcje"].LogChannelID}`).send({ embed: log })
            if (!args[0]) return message.reply({ embed: usage })
            .then(message => {
                message.delete({ timeout: 3000 })
            })
            if (!args[1]) return message.reply({ embed: usage })
            .then(message => {
                message.delete({ timeout: 3000 })
            })
            if (!args[2]) return message.reply({ embed: usage })
            .then(message => {
                message.delete({ timeout: 3000 })
            })
            if (fs.existsSync(`./users/${nick}.capesystem`)) {
                if (model === "wings") {
                    if (fs.existsSync(`/var/www/html/cosmetic_list/wingsid/${modelid}.png`)) {
                        if (fs.existsSync(`/var/www/html/items/wings/users/${nick}.png`)) {
                            fs.unlinkSync(`/var/www/html/items/wings/users/${nick}.png`, (err) => {
                                if (err) throw err;
                            });
                        }
                        fs.copyFile(`/var/www/html/cosmetic_list/wingsid/${modelid}.png`, `/var/www/html/items/wings/users/${nick}.png`, (err) => {
                            if (err) throw err;
                        });  
                        message.reply(gived)
                        .then(message => {
                            message.delete({ timeout: 5000 })
                        })
                    } else {
                        message.channel.send(errorid)
                    }     
                }
                if (model === "item") {
                    if (fs.existsSync(`/var/www/html/cosmetic_list/itemsid/${modelid}.png`)) {
                        if (fs.existsSync(`/var/www/html/items/item/users/${nick}.png`)) {
                            fs.unlinkSync(`/var/www/html/items/item/users/${nick}.png`, (err) => {
                                if (err) throw err;
                            });
                        }           
                        fs.copyFile(`/var/www/html/cosmetic_list/itemsid/${modelid}.png`, `/var/www/html/items/item/users/${nick}.png`, (err) => {
                            if (err) throw err;
                        });  
                        message.reply(gived)
                        .then(message => {
                            message.delete({ timeout: 5000 })
                        })
                    } else {
                        message.channel.send(errorid)
                    }  
                }
                if (model === "cape") {
                    if (fs.existsSync(`/var/www/html/cosmetic_list/capesid/${modelid}.png`)) {
                        fs.copyFile(`/var/www/html/cosmetic_list/capesid/${modelid}.png`, `/var/www/html/capes/${nick}.png`, (err) => {
                            if (err) throw err;
                        });     
                        message.reply(gived)
                        .then(message => {
                            message.delete({ timeout: 5000 })
                        })
                    } else {
                        message.reply(errorid)
                    }      
                }
                if (model === "hat") {
                    if (fs.existsSync(`/var/www/html/cosmetic_list/hatsid/${modelid}.png`)) {
                        fs.copyFile(`/var/www/html/cosmetic_list/hatsid/${modelid}.png`, `/var/www/html/items/hat/users/${nick}.png`, (err) => {
                            if (err) throw err;
                        });     
                        message.reply(gived)
                        .then(message => {
                            message.delete({ timeout: 5000 })
                        })
                    } else {
                        message.reply(errorid)
                    }      
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
 