/* eslint-disable indent */
const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('ban')
	.setDescription('Bannir quelqu\'un du server.')
	.addUserOption(option =>
		option
			.setName('cible')
			.setDescription('Le membre à bannir')
			.setRequired(true))
	.addStringOption(option =>
		option
			.setName('raison')
			.setDescription('Raison du bannisement'))
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction) {
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
			return interaction.reply('❌ | Vous n\'avez pas la permission d\'utiliser cette commande. ');
		}
		else {
			const banned = interaction.options.getUser('cible');
			const raison = interaction.options.getString('raison') || 'Aucune raison spécifiée.';

			if (banned == interaction.member.id) return interaction.reply('❌ | Vous ne pouvez pas vous bannir vous même.');
			if (interaction.member.guild.owner === banned) return interaction.reply('❌ | Vous ne pouvez pas bannir le créateur du serveur.');

			try {
				await interaction.guild.members.ban(banned);
				return (interaction.reply(`🔥 | ${banned} a été banni.e du serveur ! Raison : ${raison}`));
			}
			catch (e) {
				return interaction.reply('❌ | Vous ne pouvez pas bannir cet utilisateur.');
			}


		}
	},
};