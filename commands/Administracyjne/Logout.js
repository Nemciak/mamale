const { MessageEmbed, UserFlags, MessageReaction, Message } = require("discord.js");
const fs = require('fs')
const config = require("../../config.json")

module.exports = {
    config: {
        name: "aunregister",
        description: "Usuwa użytkowników z bazy danych, prócz kosmetyków i pelerynek",
    },
    run: async (client, message, args) => {
        const minecraftusers = require(`../../data/users.json`)
        let user = message.author;
        let avatar = user.displayAvatarURL({size:1024});
        let nickname = args[0]

                    /// EMBEDY ///

        const usage = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`⛔ Poprawne użycie: ${config["Konfiguracja"].prefix}aunregister <nick>`)
        const done = new MessageEmbed()
            .setColor('#00ff00')
            .setAuthor(`Poprawnie odrejestrowano gracza: ${nickname}`, `https://minotar.net/bust/${nickname}`)
            .setDescription(`Odrejestrowałeś gracza: **${nickname}**\nTen nick teraz jest dostępny do ponownego zarejestrowania\nKomenda **${config["Konfiguracja"].prefix}aunregister** nie usuwa jego **pelerynek** i **kosmetyk**!`)
            .setThumbnail(`https://minotar.net/bust/${nickname}`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
        const unr = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`Nie odnaleziono nicku ${nickname} w bazie danych!`)
        const perms = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor('Nie masz uprawnień do używania komend administracyjnych.', `${avatar}`)

        message.delete()
        if (message.member.roles.cache.has(`${config["Opcje"].TeamRoleID}`)) {
            if (!args[0]) {
                message.reply({ embed: usage })
                .then(message => {
                    message.delete({ timeout : 3000 })
                })
                return;
              }
              if (fs.existsSync(`./users/${nickname}.capesystem`)) {
                  fs.unlinkSync(`./users/${nickname}.capesystem`, (err) => {
                    if (err) throw err;
                  });
                  message.reply({ embed: done })
                  .then(message => {
                    message.delete({ timeout : 3000 })
                  })
              } else {
                  message.reply({ embed: unr })
                  .then(message => {
                    message.delete({ timeout : 3000 })
                  })
              }
        } else {
            message.reply({ embed: perms })
            .then(message => {
                message.delete({ timeout : 3000 })
            })
        }

    }
}