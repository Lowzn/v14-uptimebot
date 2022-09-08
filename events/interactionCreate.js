const { Collection, EmbedBuilder } = require("discord.js");
const ravendb = require("raven.database");

const db = new ravendb({
	"dbName": "database", 
  "dbPath": "ravendb", 
  "noBlankData": true,
  "readable": true,
  "language": "en" 
});

const { readdirSync } = require("fs");

module.exports = async(client, interaction) => {

  if(interaction.isChatInputCommand()) {

    if (!interaction.guildId) return;

    readdirSync('./commands').forEach(f => {

      const cmd = require(`../commands/${f}`);

      if(interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {

        return cmd.run(client, interaction, db);


      }


    });



  }

};
