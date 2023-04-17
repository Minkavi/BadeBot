/* eslint-disable indent */
const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const Canvas = require('@napi-rs/canvas');
const { GlobalFonts } = require('@napi-rs/canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dox')
        .setDescription('GET DOXXED IDIOT'),

    async execute(interaction) {
        let files = fs.readdirSync("assets/imgDox/");

        GlobalFonts.registerFromPath('./assets/fontDox/impact.ttf', 'IMPACT')

        const canvas = Canvas.createCanvas(250, 250);
        const context = canvas.getContext('2d');

        const random = Math.floor(Math.random() * (255 - 100 + 1) + 100)
        const random2 = Math.floor(Math.random() * (255 - 100 + 1) + 100)

        const background = await Canvas.loadImage(`./assets/imgDox/planete.jpeg`);

        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.font = '35px IMPACT';

        context.fillStyle = '#ffffff';

        context.fillText("GET DOXXED IDIOT", canvas.width / 50.0, canvas.height / 8.0);

        context.fillText(`192.168.${random}.${random2}`, canvas.width / 50.0, canvas.height / 1.0);

        context.strokeRect(0, 0, canvas.width, canvas.height);

        const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: 'doxxed.jpeg' });

        
        await interaction.reply({ files: [attachment] });

    },
};