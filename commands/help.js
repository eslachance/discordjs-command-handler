exports.run = (client, message, args, level) => {
  if (!args[0]) {
    const settings = client.settings.get(message.guild.id);
    const myCommands = client.commands.filter(c=>c.conf.permLevel <= level);
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n`;
    const sorted = myCommands.sort((p, c) => p.help.category > c.help.category ? 1 : -1);
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.channel.send(output, {code:"asciidoc"});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      // If the message author does `help eval`, and they're not the author
      // the bot will ignore them.
      if (level < command.conf.permLevel) return;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\nalises:: ${command.conf.aliases.join(", ")}`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: 0
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
