const { MessageEmbed, UserFlags, MessageReaction, Message } = require("discord.js");
const fs = require('fs')
const config = require("../../config.json")
const moment = require('moment');
const { hasUncaughtExceptionCaptureCallback } = require("process");

module.exports = {
    config: {
        name: "check",
        description: "Komenda informacyjna dla administracji",
    },
    run: async (client, message, args) => {
        const minecraftusers = require(`../../data/users.json`)
        let user = message.author;
        let avatar = user.displayAvatarURL({size:1024});

        if (message.mentions.users.size) {
            let member = message.mentions.users.first()
            if(minecraftusers[message.author.id]) {
                var nickname = minecraftusers[member.id].nickname
                if (fs.existsSync(`/var/www/html/items/wings/users/${nickname}.png`)) {
                    wings = "Posiada"
                } else {
                    wings = "Nieposiada"
                }
                if (fs.existsSync(`/var/www/html/items/item/users/${nickname}.png`)) {
                    item = "Posiada"
                } else {
                    item = "Nieposiada"
                }
                if (fs.existsSync(`/var/www/html/items/hat/users/${nickname}.png`)) {
                    hat = "Posiada"
                } else {
                    hat = "Nieposiada"
                }
            }

        if (member) {

            if (fs.existsSync(`./users/${nickname}.capesystem`)) {
                const info1 = new MessageEmbed()
                    .setColor("#009CF5")
                    .setAuthor(`Informacje o użytkowniku: ${member.username}`, member.displayAvatarURL())
                    .addField('Nazwa użytkownika', `${member.tag}`, true)
                    .addField('Nick w minecraft', `${minecraftusers[member.id].nickname}`, true)
                    .addField('ID użytkownika', `${member.id}`, true)
                    .addField('Data dołączenia', `${moment(member.joinedAt).format("D/M/YYYY h:mm")}`, true)
                    .addField('Konto założone', `${moment(member.createdAt).format("D/M/YYYY h:mm")}`, true)
                    .addField('Avatar', `[Kliknij](${member.displayAvatarURL()})`, true)
                    .addField('Skrzydła', `${wings}`, true)
                    .addField('Item', `${item}`, true)
                    .addField('Czapka', `${hat}`, true)
                    .setThumbnail(`https://minotar.net/bust/${minecraftusers[member.id].nickname}`)
                    .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
                message.channel.send(info1)
            } else {
                const info2 = new MessageEmbed()
                    .setColor("#009CF5")
                    .setAuthor(`Informacje o użytkowniku: ${member.username}`, member.displayAvatarURL())
                    .addField('Nazwa użytkownika', `${member.tag}`, true)
                    .addField('Nick w minecraft', `Niezarejestrowany`, true)
                    .addField('ID użytkownika', `${member.id}`, true)
                    .addField('Data dołączenia', `${moment(member.joinedAt).format("D/M/YYYY h:mm")}`, true)
                    .addField('Konto założone', `${moment(member.createdAt).format("D/M/YYYY h:mm")}`, true)
                    .addField('Avatar', `[Kliknij](${member.displayAvatarURL()})`, true)
                    .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
                message.channel.send(info2)
            }
        } else {
            if (fs.existsSync(`./users/${nickname}.capesystem`)) {
                const info12 = new MessageEmbed()
                    .setColor("#009CF5")
                    .setAuthor(`Informacje o użytkowniku: ${member.username}`, member.displayAvatarURL())
                    .addField('Nazwa użytkownika', `${user.tag}`, true)
                    .addField('Nick w minecraft', `${minecraftusers[message.author.id].nickname}`, true)
                    .addField('ID użytkownika', `${message.author.id}`, true)
                    .addField('Data dołączenia', `${moment(user.joinedAt).format("D/M/YYYY h:mm")}`, true)
                    .addField('Konto założone', `${moment(user.createdAt).format("D/M/YYYY h:mm")}`, true)
                    .addField('Avatar', `[Kliknij](${user.displayAvatarURL()})`, true)
                    .addField('Skrzydła', `${wings}`, true)
                    .addField('Item', `${item}`, true)
                    .addField('Czapka', `${hat}`, true)
                    .setThumbnail(`https://minotar.net/bust/${minecraftusers[message.author.id].nickname}`)
                    .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
                message.channel.send({ embed: info12 })   
            } else {
                const info22 = new MessageEmbed()
                    .setColor("#009CF5")
                    .setAuthor(`Informacje o użytkowniku: ${member.username}`, member.displayAvatarURL())
                    .addField('Nazwa użytkownika', `${member.tag}`, true)
                    .addField('Nick w minecraft', `Niezarejestrowany`, true)
                    .addField('ID użytkownika', `${member.id}`, true)
                    .addField('Data dołączenia', `${moment(member.joinedAt).format("D/M/YYYY h:mm")}`, true)
                    .addField('Konto założone', `${moment(member.createdAt).format("D/M/YYYY h:mm")}`, true)
                    .addField('Avatar', `[Kliknij](${member.displayAvatarURL()})`, true)
                    .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL())
                message.channel.send({ embed: info22 })   
            }
        }
    }
}
}