const { Client, EmbedBuilder } = require("discord.js");
const { SendEmbed } = require("easyembeds.js");

module.exports = {
  name: "linkler",
  description: "Sistemdeki linkleri görüntüleyin.",
  type: 1,
  options: [],

  run: async(client, interaction, db) => {

    
    
  const links = db.fetch(`links`)
    
  const Links = links.map(links => links).join("\n")
  
    if(!links) {
      db.set(`links`, [])
      
      return SendEmbed(interaction, {
        description: "❌ **|** Database ayarlanmadığı için otomatik ayarlandı, tekrardan aynı komutu kullanın!",
        color: "Red"
      });
    };
    
    
    return SendEmbed(interaction, {
      color: "Blue",
      description: `${Links}`
    });
    
  }

};
