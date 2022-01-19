const config = require("../../config.json");
module.exports = async client => {

  console.log(`jak nie umiesz zrobic to napisz na priv do kielczi#6506`);
    setInterval(() => {
        const statuses = [
            `Wersja: 1.0`,
            `"cracked" by kielczi xdddd`
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "STREAMING"}) 
    }, 2000)}


