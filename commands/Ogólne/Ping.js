const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json")
const fs = require('fs');

module.exports = {
  config: {
    name: "ping",
    description: "Sprawdzanie pingu",
  },
  run: async (client, message, args) => {

    let member = message.author;

    const ping = new MessageEmbed()
        .setAuthor(`🏓... Sprawdzanie pingu`)

    const pingdone = new MessageEmbed()
        .setAuthor(`✅ ${member.tag} - Sukces!`)
        .setDescription(`🏓 Twój ping: **${Date.now() - message.createdTimestamp}ms**\n🤖 Ping bota: **${Math.round(client.ws.ping)}ms**`)
        .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
    
    message.channel.send(ping)
    .then(message => {
        message.edit(pingdone)
    })
  }
}