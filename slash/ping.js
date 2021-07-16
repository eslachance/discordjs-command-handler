const slashCommand = require("../base/slashCommand.js");

class Ping extends slashCommand {

  constructor(client) {
    super(client, {
      name: "ping",
      description: "Pongs when pinged.",
      options: []
    });
  }

  async run(client, interaction) {
    try {
      await interaction.defer();
      const reply = await interaction.editReply("Ping?");
      await interaction.editReply(`Pong! Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
        
    } catch (e) {
      console.log(e);
      return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
    }
  }
}

module.exports = Ping;