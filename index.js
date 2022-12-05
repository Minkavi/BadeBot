/* eslint-disable indent */
const { Player } = require('discord-player');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');


dotenv.config();
const TOKEN = process.env.TOKEN;


const client = new Client(
    { intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMembers,
        ],
    },
);

client.commands = new Collection();
client.player = new Player(client, {
  ytdlOptions: {
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
  },
});
module.exports = client;
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
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            return command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Une erreur s\'est produit durant l\'execution de cette commande.', ephemeral: true });
        }
});

client.login(TOKEN);