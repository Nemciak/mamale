const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json")
const fs = require('fs');
const http = require('https');

module.exports = {
  config: {
    name: "custom",
    description: "Nadawanie customowych przedmiotów",
  },
  run: async (client, message, args) => {
        const minecraftusers = require(`../../data/users.json`)
        let user = message.author;
        let avatar = user.displayAvatarURL({size:1024});
        let model = args[0];
        let nickname = args[1];
        let link = args[2];


            /// EMBEDY ///

        const usage = new MessageEmbed()
          .setColor('#FF0000')
          .setAuthor(`⛔ Poprawne użycie: ${config["Konfiguracja"].prefix}custom <MODEL> <nick> <link>`)
          .setDescription(`Aktualnie dostępne nadawanie customowych kosmetyków dla modeli:\n> **cape**\n> **item**\n> **wings**\n> **hat**`)
        const gived = new MessageEmbed()
          .setColor('#00ff00')
          .setAuthor(`Nadano custom-${model} na nick: ${nickname}`, `https://minotar.net/bust/${nickname}`)
          .setThumbnail(link)
          .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
        const perms = new MessageEmbed()
          .setColor('#FF0000')
          .setAuthor(`Nie posiadasz uprawnień do tej komendy, wymagana ranga: CGA`)
          .setThumbnail(link)
          .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
        const logcustom = new MessageEmbed()
          .setColor('#00ff00')
          .setAuthor(message.author.tag, avatar)
          .setDescription(`${message.author}\nna nick: **${nickname}**`)
          .setThumbnail(link)
          .setTimestamp(new Date())
          .setFooter(`Log zapisany z daty`, avatar)

            /// EMBEDY ///

        message.delete()
        if (message.member.roles.cache.has("931835293298987062")) {
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
          if (model === "cape") {
            message.reply({ embed: gived })
            .then(message => {
                message.delete({ timeout: 3000 })
            })
            const file = fs.createWriteStream(`/var/www/html/capes/${nickname}.png`);
            const request = http.get(`${link}`, function(response) {
                response.pipe(file);
            });
            client.channels.cache.get(`${config["Opcje"].LogChannelID}`).send({ embed: logcustom })
          }
          if (model === "item") {
            message.reply({ embed: gived })
            .then(message => {
                message.delete({ timeout: 3000 })
            })
            const file = fs.createWriteStream(`/var/www/html/items/item/users/${nickname}.png`);
            const request = http.get(`${link}`, function(response) {
                response.pipe(file);
            });
            client.channels.cache.get(`${config["Opcje"].LogChannelID}`).send({ embed: logcustom })
          }
          if (model === "wings") {
            message.reply({ embed: gived })
            .then(message => {
                message.delete({ timeout: 3000 })
            })
            const file = fs.createWriteStream(`/var/www/html/items/wings/users/${nickname}.png`);
            const request = http.get(`${link}`, function(response) {
                response.pipe(file);
            });
            client.channels.cache.get(`${config["Opcje"].LogChannelID}`).send({ embed: logcustom })
          }
        } else {
          message.channel.send(perms)
          .then(message => {
            message.delete({ timeout: 3000 })
          })
        }     
  }
}
