const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json")
const fs = require('fs');
const { MessageButton } = require('discord-buttons')

module.exports = {
  config: {
    name: "help",
    description: "Pomocne komendy",
  },
  run: async (client, message, args) => {
    let button = new MessageButton()
    .setStyle('url')
    .setLabel('Gówno bot btw nie polecam uzywac bo nawet nie jest zabezpieczony!')
    .setURL('http://www.kielczi.pl/')

    const help = new MessageEmbed()
        .setColor("#009CF5")
        .setAuthor(`${config["Konfiguracja"].name} - Pomoc`, client.user.displayAvatarURL())
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription("Autor bota: **[cieplybut#5309](http://www.Kielczi.pl/)** | <@778529039417606214>\nWersja aplikacji: **1.0**\n\n**Ogólne komendy:**\n`!info` - Informacje o aplikacji\n`!help` - Wszystkie komendy bota\n`!ping` - Sprawdzanie pingu uzytkownika i bota\n\n**Komendy dla użytkowników:**\n`!register` - Rejestrowanie\n`!unregister` - Odrejestrowywanie\n\n`!cape` - Nadawanie pelerynki\n`!hide` - Ukrywanie kosmetyków (można potem je odkryć)\n`!show` - Odkrywanie kosmetyków z !hide\n\nJeśli wystąpił jakiś problem, skontaktuj się z właścicielem bota!")
        .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
        const helpadm = new MessageEmbed()
        .setColor("#009CF5")
        .setAuthor(`${config["Konfiguracja"].name} - Pomoc [ADMIN]`, client.user.displayAvatarURL())
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription("Autor bota: **[cieplybut#5309](http://www.Kielczi.pl/)** | <@778529039417606214>\nWersja aplikacji: **1.0**\n\n**Ogólne komendy:**\n`!info` - Informacje o aplikacji\n`!help` - Wszystkie komendy bota\n`!ping` - Sprawdzanie pingu uzytkownika i bota\n\n**Komendy dla użytkowników:**\n`!register` - Rejestrowanie\n`!unregister` - Odrejestrowywanie\n\n`!cape` - Nadawanie pelerynki\n`!hide` - Ukrywanie kosmetyków (można potem je odkryć)\n`!show` - Odkrywanie kosmetyków z !hide\n\n**Komendy administracyjne:**\n`!custom` - Nadawanie customowych kosmetykow\n`!check` - Informacje o uzytkowniku\n`!aunregister` - Odrejestrowywanie uzytkownika\n`!nadaj` - Nadawanie kosmetykow\n`!zdejmij` - Zabieranie kosmetykow\n\nJeśli wystąpił jakiś problem, skontaktuj się z właścicielem bota!")
        .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());

   if (message.channel.id !== `${config["Opcje"].MachineChannelID}`) {
    if (message.member.roles.cache.has(`${config["Opcje"].TeamRoleID}`)) {   
        message.channel.send(helpadm, button)
        .then(message =>{
            message.delete({ timeout : 1000000 })
        })
    } else {
        message.channel.send(help, button)
        .then(message =>{
            message.delete({ timeout : 1000000 })
        })
    }
   } 
  }
}