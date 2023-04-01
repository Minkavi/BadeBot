/* eslint-disable indent */
const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('kick')
	.setDescription('Virer quelqu\'un du server.')
	.addUserOption(option =>
		option
			.setName('cible')
			.setDescription('Le membre à virer')
			.setRequired(true))
	.addStringOption(option =>
		option
			.setName('raison')
			.setDescription('Raison du virement'))
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction) {
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
			return interaction.reply('❌ | Vous n\'avez pas la permission d\'utiliser cette commande. ');
		}
		else {
			const kicked = interaction.options.getUser('cible');
			const raison = interaction.options.getString('raison') || 'Aucune raison spécifiée.';

			if (kicked == interaction.member.id) return interaction.reply('❌ | Vous ne pouvez pas vous virer vous même.');
			if (interaction.member.guild.owner === kicked) return interaction.reply('❌ | Vous ne pouvez pas virer le créateur du serveur.');

			try {
				await interaction.guild.members.kick(kicked);
				return (interaction.reply(`🔥 | ${kicked} a été viré.e du serveur ! Raison : ${raison}`));
			}
			catch (e) {
				return interaction.reply('❌ | Vous ne pouvez pas virer cet utilisateur.');
			}


		}
	},
};