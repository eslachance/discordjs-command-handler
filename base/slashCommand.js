class slashCommand {

  constructor(client, {
    name = null,
    description = "No description provided.",
    options = [],
    defaultPermissions = true,
    guild = false // false = global, true = guild.
  }) {
    this.client = client;
    this.commandData = { name, description, options, defaultPermissions };
    this.guildOnly = guild;
  }

}

module.exports = slashCommand;
