/* eslint-disable indent */
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const Canvas = require('@napi-rs/canvas');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
});

dotenv.config();
const TOKEN = process.env.TOKEN;

client.commands = new Collection();


const commandPath = path.join(__dirname, 'slash');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    // set a new item in the collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag} and is in ${client.guilds.cache.size} servers`);
    client.user.setPresence({
        activities: [{ name: 'Outer Wilds' }],
        status: 'dnd',
        type: 'PLAYING',
    });
});



client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
      console.error(`Aucune commande nommée ${interaction.commandName} ont été trouvé.`);
      return;
  }

  try {
      return command.execute(interaction, client);
  }
  catch (error) {
      console.error(error);
      return interaction.reply({ content: 'Une erreur s\'est produit durant l\'execution de cette commande.', ephemeral: true });
  }
});

module.exports = client;

client.login(TOKEN);
