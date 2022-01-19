const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json")
const fs = require('fs');
const { MessageButton } = require('discord-buttons')

module.exports = {
  config: {
    name: "info",
    description: "Informacje o bocie",
  },
  run: async (client, message, args) => {
      const moment = require("moment");
      require("moment-duration-format");
      const duration = moment.duration(client.uptime).format(" D[d], H[g], m[min]");

      let button = new MessageButton()
      .setStyle('url')
      .setLabel('Skontaktuj siê z w³aœcicielem bota!')
      .setURL('https://discord.gg/FfRKNZyNGK')

      const info = new MessageEmbed()
        .setColor("#009CF5")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Autor bota: [**cieplybut#5309**](http://www.kielczi.pl/) | <@778529039417606214>\nBot napisany w: **discord.js@13**\nPrefix: **${config["Konfiguracja"].prefix}**`)
        .addField(`Ping bota`, `${Math.round(client.ws.ping)}ms`, true)
        .addField(`Kana³y`, client.channels.cache.size, true)
        .addField(`U¿ytkownicy`, client.users.cache.size, true)
        .addField(`Wersja(CapeSystem)`, `1.0`, true)
        .addField(`Ostatni update`, duration, true)
        .addField(`Na serwerze`, message.guild.name, true)
        .setFooter(`AngelCape    â€¢   UÅ¼yte przez: ${message.author.tag}`, client.user.displayAvatarURL());
	if (message.channel.id !== `${config["Opcje"].MachineChannelID}`) {
        	message.channel.send(info, button)
	}
  }
}