const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json")
const fs = require('fs');


module.exports = {
  config: {
    name: "hide",
    description: "Ukrywanie kosmetyków",
  },
  run: async (client, message, args) => {
    const minecraftusers = require(`../../data/users.json`)
    let user = message.author;
    let avatar = user.displayAvatarURL({size:1024});
    let nickname = minecraftusers[message.author.id].nickname;
    let hide = args[0];
    if(!minecraftusers[message.author.id]) {
	minecraftusers[message.author.id] = {
		nickname: null
	}
    }


            /// EMBEDY ///

    const polish_usage = new MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(`⛔ Poprawne użycie: ${config["Konfiguracja"].prefix}hide <MODEL>`)
        .setDescription(`Wytlumaczenie argumentu - 1:\n\n**Model:**\nwings - Ukrycie skrzydel\nitem - Ukrycie itemu\naureola - Ukrycie aureoli\n\nnp. **$hide wings** ukrywa ci skrzydla, zeby je potem pokazac wpisz **$show wings**`)
    const polish_hided = new MessageEmbed()
        .setColor(`#00ff00`)
        .setAuthor('✅ Ukryto!')
        .setDescription(`Model, który został ukryty: **${hide}**\nNick w minecraft: **${nickname}**\nJeśli chcesz je znowu zobaczyć wpisz na tym kanale **$show ${hide}**`)
        .setThumbnail(`https://minotar.net/bust/${nickname}`)
        .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
    const polish_notr = new MessageEmbed()
        .setColor('#FF0000')
        .setAuthor('Musisz się najpierw zarejestrować', `${avatar}`)
        .setDescription(`Nie jestes zarejestrowany! Aby sie zarejestrowac wpisz \`${config["Konfiguracje"].prefix}register <NICK>\` na tym kanale, potem bedziesz mogl korzystać z komend!`)
        .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());

                /// EMBEDY ///

    if (message.channel.id == config["Opcje"].MachineChannelID) {
        if (!args[0]) {
            message.reply({ embed: polish_usage })
            .then(message => {
                message.delete({ timeout: 6000 })
            })
            return;
          }
          if (fs.existsSync(`./users/${nickname}.capesystem`)) {
            if ((args[0]) === "wings") {
                if (fs.existsSync(`/var/www/html/items/wings/users/${nickname}.png`)) {
                fs.rename(`/var/www/html/items/wings/users/${nickname}.png`, `/var/www/html/items/wings/users/#${nickname}.png`, function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                });
                }
                message.reply({ embed: polish_hided })
                .then(message => {
                    message.delete({ timeout: 3000 })
                })
            }
            if ((args[0]) === "item") {
                if (fs.existsSync(`/var/www/html/items/item/users/${nickname}.png`)) {
                fs.rename(`/var/www/html/items/item/users/${nickname}.png`, `/var/www/html/items/item/users/#${nickname}.png`, function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                });
                }
                    message.reply({ embed: polish_hided })
                    .then(message => {
                      message.delete({ timeout: 3000 })
                    })
            }
            if ((args[0]) === "hat") {
                if (fs.existsSync(`/var/www/html/items/hat/users/${nickname}.png`)) {
                fs.rename(`/var/www/html/items/hat/users/${nickname}.png`, `/var/www/html/items/hat/users/#${nickname}.png`, function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                });  
                }          
                    message.reply({ embed: polish_hided })
                    .then(message => {
                      message.delete({ timeout: 3000 })
                    })
            }
        } else {
                message.reply({ embed: polish_notr })
                .then(message => {
                  message.delete({ timeout: 3000 })
                })
        }
    }
  }
}