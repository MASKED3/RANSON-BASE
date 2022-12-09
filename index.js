const Discord = require("discord.js")

const config = require("./config.json")

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
    client.user.setStatus("dnd")
    console.log(`✔ - O sistema foi logado em ${client.user.tag} com sucesso! ${config.version}`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)


process.on('unhandRejection', (reason, promise) => {
    console.log(`🚨 | [Erro]\n\n` + reason, promise);
  });
  process.on('uncaughtException', (error, origin) => {
    console.log(`🚨 | [Erro]\n\n` + error, origin);
  });
  process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚨 | [Erro]\n\n` + error, origin);
  });