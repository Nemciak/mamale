const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json")
const fs = require('fs');

module.exports = {
  config: {
    name: "cape",
    description: "Nadawanie pelerynek",
  },
  run: async (client, message, args) => {
        const minecraftusers = require(`../../data/users.json`)
        let user = message.author;
        let avatar = user.displayAvatarURL({size:1024});
        let cape = args[0];
	if(!minecraftusers[message.author.id]) {
		minecraftusers[message.author.id] = {
			nickname: null
		}
	}
                    /// EMBEDY ///

        const polish_usage = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`⛔ Poprawne użycie: ${config["Konfiguracja"].prefix}cape <ID>`)
        const polish_gived = new MessageEmbed()
            .setColor('#00ff00')
            .setAuthor(`✅ Pelerynka została nadana!`)
            .setDescription(`ID pelerynki: **${cape}**\nNick na który została nadana: **${minecraftusers[message.author.id].nickname}**`)
            .setThumbnail(`https://minotar.net/bust/${minecraftusers[message.author.id].nickname}`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
        const polish_notr = new MessageEmbed()
            .setColor('#FF0000')
            .setAuthor('Musisz się najpierw zarejestrować', `${avatar}`)
            .setDescription(`Nie jestes zarejestrowany! Aby sie zarejestrowac wpisz \`${config["Konfiguracja"].prefix}register <NICK>\` na tym kanale, potem bedziesz mogl korzystać z komend!`)
            .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());

                    /// EMBEDY ///

        if (message.channel.id == `${config["Opcje"].MachineChannelID}` && message.author.id !== `${config["Opcje"].BotID}`) {
            message.delete();
            if (!args[0]) {
                  message.reply({ embed: polish_usage })
                  .then(message => {
                    message.delete({ timeout: 3000 })
                  })
		return;
	    }
            if (!fs.existsSync(`./users/${minecraftusers[message.author.id].nickname}.capesystem`)) {
                  message.reply({ embed: polish_notr })
                  .then(message => {
                      message.delete({ timeout: 3000 })
                  })
                return;
            }
            if (fs.existsSync(`/var/www/html/cosmetic_list/capesid/${cape}.png`)) {
                fs.copyFile(`/var/www/html/cosmetic_list/capesid/${cape}.png`, `/var/www/html/capes/${minecraftusers[message.author.id].nickname}.png`, (err) => {
                    if (err) throw err;
                });
                    message.reply({ embed: polish_gived })
                    .then(message => {
                      message.delete({ timeout: 3000 })
                    })
            }
        }
  }
}
