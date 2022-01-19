const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
const fs = require('fs');
const moment = require("moment");
var replace = require("replace");

module.exports = {
  config: {
    name: "register",
    description: "Rejestrowanie użytkownika",
  },
  run: async (client, message, args) => {
    const minecraftusers = require(`../../data/users.json`)
    let user = message.author;
    let avatar = user.displayAvatarURL({size:1024});
    let nickname = args[0]; 
    const array = ["@", "!", "#", "$", "%", "^", "&", "*", "-", "+", "=", "~", "{", "[", "}", "]", ";", ":", "\\", ",", "<", ".", ">", "?", "/"];
    if(!minecraftusers[message.author.id]) {
      minecraftusers[message.author.id] = {
        nickname: null
      }
    }

              ///// EMBEDY //////

    const polish_usage = new MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(`⛔ Poprawne użycie: ${config["Konfiguracja"].prefix}register <nick>`)
    const polish_taken = new MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(`⛔ Wykryto błąd`)
        .setDescription(`Nick na który próbowałeś się zarejestrować jest zajęty!\nJeśli jest to twój nick, prosimy o skontaktowanie się na <#933156247727910956>`)
        .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
    const polish_wrong = new MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(`⛔ Wykryto błąd`)
        .setDescription(`Nick, który próbujesz zarejestrować posiada niedozwolone znaki!\nUżyj swojego nicku z minecrafta!`)
        .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());
    const polish_success = new MessageEmbed()
        .setColor('#00ff00')
        .setAuthor(`Nowy gracz: ${nickname}`, `https://minotar.net/helm/${nickname}`)
        .setDescription(`Zarejestrowano na nick: **${nickname}**\nZostałeś zarejestrowany w bazie danych DiroCape, na ten nick zostaną nadawane kosmetyki/pelerynki!\nJeśli wprowadziłeś niepoprawny nick, ponownie użyj tej komendy!`)
        .setThumbnail(`https://minotar.net/bust/${nickname}`)
        .setFooter(`${config["Konfiguracja"].name}    •   Użyte przez: ${message.author.tag}`, client.user.displayAvatarURL());

      

              ///// EMBEDY //////

              if (message.channel.id == `${config["Opcje"].MachineChannelID}` && message.author.id !== `${config["Opcje"].BotID}`) {
                if (!args[0]) {
                    message.reply({ embed: polish_usage })
                    .then(message => {
                      message.delete({ timeout: 3000 })
                    })
                  return;
                }
                 if (array.some(e=>nickname.includes(e))) {
                     message.reply({ embed: polish_wrong })
                     .then(message => {
                        message.delete({ timeout: 3000 })
                     })
                   return;
                 }
                 if (fs.existsSync(`./users/${nickname}.capesystem`)) {
                     message.reply({ embed: polish_taken })
                     .then(message => {
                         message.delete({ timeout: 3000 })
                     })
                   return;
                  }
                  fs.appendFile(`./users/${nickname}.capesystem`, message.author.id, (err) => {
                    if (err) throw err;
                  });    
                  minecraftusers[message.author.id] = {
                    nickname: nickname
                  }
                  fs.writeFileSync(`./data/users.json`, JSON.stringify(minecraftusers, null, 2), err => {
                   if (err) {
                    console.log(err);
                   }
                  })
                  fs.copyFile(`/var/www/html/users/config.cfg`, `/var/www/html/users/${nickname}.cfg`, (err) => {
                     if (err) throw err;
                  });      
                    message.channel.send({ embed: polish_success })
                    .then(message => {
                      message.delete({ timeout: 6000 })
                    })
                  }
                }
              }
