const config = require("../../config.json");


module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(config["Konfiguracja"].prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.channel.send(`Try ${config["Konfiguracja"].prefix}help to see a list of my commands.`)
    if (!message.content.startsWith(config["Konfiguracja"].prefix)) return;
    let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    if (commandfile) commandfile.run(client, message, args)
}

