const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { QueryType } = require('discord-player');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Permet de jouer de la musique.')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('playlist')
				.setDescription('Recherche une playlist a partir d\'une URL.')
				.addStringOption((option) => option.setName('url').setDescription('L\'URL de la playlist.').setRequired(true)),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('query')
				.setDescription('Recherche des termes ou une url.')
				.addStringOption((option) =>
					option.setName('terme').setDescription('Les termes de recherche, ou l\'URL').setRequired(true),
				),
		),
	/**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @returns
         */
	async execute(interaction, client) {
		// const { options, member, channel } = interaction;
		const VoiceChannel = interaction.member.voice.channel;

		if (!VoiceChannel) {return interaction.reply({ content: '❌ | Vous n\'êtes pas dans un canal vocal', ephemeral: true });}

		const queue = await client.player.createQueue(interaction.guild);
		if (!queue.connection) await queue.connect(VoiceChannel);

		const embed = new EmbedBuilder();

		if (interaction.options.getSubcommand() === 'playlist') {
			const url = interaction.options.getString('url');
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST,
			});

			if (result.tracks.length === 0) {return interaction.editReply('pas de resultaaa');}

			const playlist = result.playlist;
			await queue.addTracks(result.tracks);
			embed
				.setDescription(`la playist **[${playlist.title}](${playlist.url})** a ajouter a la grosse queue avc ${result.tracks.length}`)
				.setThumbnail(playlist.thumbnail);
		}
		else if (interaction.options.getSubcommand() === 'query') {
			const url = interaction.options.getString('terme');
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			});

			if (result.tracks.length === 0) {return interaction.editReply('pas de resultaaa');}

			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`**[${song.title}](${song.url})** a ajouter a la grosse queue`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `sa dur ${song.duration} min bouf` });
		}
		if (!queue.playing) await queue.play();
		await interaction.editReply({
			embeds: [embed],
		});
	},
};