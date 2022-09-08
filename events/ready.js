const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const ravendb = require("raven.database");

const db = new ravendb({
	"dbName": "database", 
  "dbPath": "ravendb", 
  "noBlankData": true,
  "readable": true,
  "language": "en" 
});

module.exports = async (client) => {

  const rest = new REST({ version: "10" }).setToken(TOKEN);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }
  
  const links = db.fetch(`links`)
  if(!links) return;
  
  setInterval(() => {
    
    links.forEach(async(link) => {
      
      try {
        
        fetch(link)
        console.log("Uptime Eklendi: "+ link)
        
      } catch {
        console.log("Bu linkte bir sorun var.")
      }
         
    }, 5000)
    
  })
  

    console.log(`${client.user.tag} Aktif!`);
};
