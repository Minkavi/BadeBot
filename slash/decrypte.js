/* eslint-disable indent */
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decrypte')
        .setDescription('Hugo vien décrypter.'),
        
    async execute(interaction) {
        let files = fs.readdirSync("assets/imgUgo/");    
        const options = fs.readFileSync('assets/sentencesUgo/sentences.txt', 'utf8').split('\n')

        const random = options[Math.floor(Math.random() * options.length)]
        await interaction.reply({ content:`${random}`, files: ['./assets/imgUgo/ugor.png'] });

    },
};