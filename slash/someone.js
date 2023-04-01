/* eslint-disable indent */
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('someone')
        .setDescription('Ping quelqu\'un au hasard'),
    async execute(interaction) {

        interaction.guild.members.fetch()
        .then(allMembers => {
           const member = allMembers.random();
            return interaction.reply(`Tu as été choisi par les dieux ${member.toString()} !`);
        })
        .catch(console.error);


    },
};