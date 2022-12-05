const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('System complet de musique.')
		.addSubcommand ((subcommand) =>
			subcommand
				.setName('play')
				.setDescription('Joue une musique.')
				.addStringOption((option) => option.setName('query').setDescription('Donne une recherche ou une url pour la musique.').setRequired(true)),
		)
		.addSubcommand ((subcommand) =>
			subcommand
				.setName('volume')
				.setDescription('Change le volume.')
				.addNumberOption((option) => option.setName('pourcentage').setDescription('10 = 10%.').setRequired(true)),
		)
		.addSubcommand ((subcommand) =>
			subcommand
				.setName('parametres')
				.setDescription('Choisissez une option.')
				.addStringOption((option) => option.setName('options').setDescription('Selectionne une option.').setRequired(true)
					.addChoices(
						{ name: 'queue', value: 'queue' },
						{ name: 'skip', value: 'skip' },
						{ name: 'pause', value: 'pause' },
						{ name: 'resume', value: 'resume' },
						{ name: 'stop', value: 'stop' },
					)),
		),
	/**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @returns
     */
	async execute(interaction, client) {
		const { options, member, channel } = interaction;
		const VoiceChannel = interaction.member.voice.channel;

		if (!VoiceChannel) {return interaction.reply({ content: '❌ | Vous n\'êtes pas dans un canal vocal', ephemeral: true });}

		// if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) {return interaction.reply({ content: `👍 | Je joue déjà de la musique dans <#${guild.me.voice.channelId}>`, ephemeral: true });}

		try {
			switch (options.getSubcommand()) {
			case 'play' : {
				client.distube.playVoiceChannel(VoiceChannel, options.getString('query'), { textChannel: channel, member: member });
				return interaction.reply({ content: '🎶 | Demande reçue.' });
			}

			case 'volume' : {
				const Volume = options.getNumber('pourcentage');
				if (Volume >> 100 || Volume < 1) {return interaction.reply({ content: 'Vous devez spécifiez un nombre entre 1 et 100.' });}

				client.distube.setVolume(VoiceChannel, Volume);
				return interaction.reply({ content: `🔊 | Le volume est maintenant de \`${Volume}%\`` });
			}
			case 'settings' : {
				const queue = await client.distube.getQueue(VoiceChannel);

				if (!queue) {return interaction.reply({ content: '🛑 | La file d\'attente est vide.' });}

				switch (options.getString('options')) {
				case 'skip' :
					await queue.skip(VoiceChannel);
					return interaction.reply({ content: '⏭️ | La musique est passée.' });
				case 'stop' :
					await queue.stop(VoiceChannel);
					return interaction.reply({ content: '⏹️ | La musique est arrêté.' });
				case 'pause' :
					await queue.pause(VoiceChannel);
					return interaction.reply({ content: '⏸️ | La musique est pausée.' });
				case 'resume' :
					await queue.resume(VoiceChannel);
					return interaction.reply({ content: '▶️ | La musique est relancée.' });
				case 'queue' :
					return interaction.reply({ embeds: [new EmbedBuilder()
						.setColor('PURPLE')
						.setDescription(`${queue.songs.map(
							(song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`,
						)] });
				}
				return;
			}
			}

		}
		catch (e) {
			const errorEmbed = new EmbedBuilder()
				.setColor(0xff0000)
				.setDescription(`🛑 Alerte: ${e}`);
			return interaction.reply({ embeds: [errorEmbed] });
		}
	},
};