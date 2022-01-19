const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const client = new Client();
require('discord-buttons')(client);

["aliases", "commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));

client.login(config["Konfiguracja"].token);
