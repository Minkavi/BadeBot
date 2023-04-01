const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const TOKEN = process.env.TOKEN;
const clientID = process.env.clientID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

// et deploi les commandes !
(async () => {
	try {
		console.log('Deleting commands');

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(Routes.applicationCommands(clientID), { body: [] },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();