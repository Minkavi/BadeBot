/* eslint-disable indent */
const { DisTube } = require('distube');
const { default: SpotifyPlugin } = require('@distube/spotify');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
// const { YtDlpPlugin } = require('@distube/yt-dlp')
const fs = require('node:fs');
const path = require('node:path');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

dotenv.config();
const TOKEN = process.env.TOKEN;

client.distube = new DisTube(client, {
	leaveOnStop: false,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
	  new SpotifyPlugin({
		emitEventsAfterFetching: true
	  }),
	]
  })


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
      console.error(`No command matching ${interaction.commandName} was found.`);
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


const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({ embeds: [new EmbedBuilder()
    .setColor('0x00FF00')
    .setDescription(`🎶 | Joue \`${song.name}\` - \`${song.formattedDuration}\`\nDemandé par: ${song.user}\n${status(queue)}.`)] },
    ))

  .on('addSong', (queue, song) =>
  queue.textChannel.send({ embeds: [new EmbedBuilder()
    .setColor('0x00FF00')
    .setDescription(`✅ | ${song.name} - \`${song.formattedDuration}\` a été ajouté à la file d'attente par : ${song.user}.`)] },
    ))

  .on('addList', (queue, playlist) =>
    queue.textChannel.send({ embeds: [new EmbedBuilder()
    .setColor('0x00FF00')
    .setDescription(`✅ | La playlist \`${playlist.name}\` (${playlist.songs.length} musiques) a été ajouté à la file d'attente.\n${status(queue)}`)] },
    ))

  .on('error', (channel, e) => {
    if (channel) channel.send(`❌ | An error encountered: ${e.toString().slice(0, 1974)}`);
    else console.error(e);
   })

  .on('empty', channel =>
    channel.send({ embeds: [new EmbedBuilder()
    .setColor('0x00FF00')
    .setDescription('🍃 | Le canal vocal est vide ! Je quitte le canal...')] },
    ))

  .on('searchNoResult', (message, query) =>
    message.channel.send({ embeds: [new EmbedBuilder()
    .setColor('0xFF0000')
    .setDescription(`❌ | Aucun résultats trouvé pour \`${query}\`!`)] },
  ))

  .on('finish', queue => queue.textChannel.send('Fini!'));

client.login(TOKEN);
