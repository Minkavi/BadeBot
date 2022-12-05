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
			const user = interaction.options.getUser('cible');
			const raison = interaction.options.getString('raison');

			if (user == interaction.member.id) return interaction.reply('❌ | Vous ne pouvez pas vous bannir vous même.');

		return (interaction.reply(`🔥 | ${user} a été banni du serveur ! Raison : ${raison}`));

		}
	},
};