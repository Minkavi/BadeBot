/* eslint-disable indent */
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helloworld')
        .setDescription('Hello World !'),
    async execute(interaction) {

        await interaction.reply({ content:'Hello World !' });

    },
};