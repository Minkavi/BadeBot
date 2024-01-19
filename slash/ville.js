/* eslint-disable indent */
const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const Canvas = require('@napi-rs/canvas');
const { GlobalFonts } = require('@napi-rs/canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ville')
        .setDescription('la ville de votre choix')
        .addAttachmentOption(option => option
            .setName('image')
            .setDescription('image de la ville')
            .setRequired(true))
        .addStringOption(option =>
            option
                .setName('nom')
                .setDescription('nom de la ville')
                .setRequired(true)),

    async execute(interaction) {
        const imgVille = interaction.options.getAttachment('image')
        const nameVille = interaction.options.getString('nom')

        GlobalFonts.registerFromPath('./assets/fontDox/impact.ttf', 'IMPACT')

        const canvas = Canvas.createCanvas(250, 250);
        const context = canvas.getContext('2d');

        const random = Math.floor(Math.random() * (8.0 - 1.0) + 1.0)
        const random2 = Math.floor(Math.random() * (200.0 - 1.0) + 2.0)

        try {
            const background = await Canvas.loadImage(imgVille.url);

            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            context.font = '35px IMPACT';
            context.fillStyle = '#ffffff';

            context.lineWidth = 4;
            context.strokeText(nameVille, random2, canvas.height / random);
            context.fillText(nameVille, random2, canvas.height / random);

            const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: 'doxxed.jpeg' });

            await interaction.reply({ files: [attachment] });
        } catch (error) {
            console.error(error)
            await interaction.reply('Erreur lors de la création de l\'image');
        }
    },
};