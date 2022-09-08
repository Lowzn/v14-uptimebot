const { Client, EmbedBuilder } = require("discord.js");
const { SendEmbed } = require("easyembeds.js");

module.exports = {
  name: "uptime-ekle",
  description: "Sisteme link ekleyin.",
  type: 1,
  options: [{
    type: 3,
    name: "link",
    description: "link",
    required: true
  }],

  run: async(client, interaction, db) => {

    const link = interaction.options.getString("link");
    const c = db.has(`uptime_${interaction.user.id}`)
    
    const links = db.fetch(`links`)
    
    if(c) {
      return SendEmbed(interaction, {
        description: "❌ **|** Zaten sisteme link eklemişsin!",
        color: "Red"
      });
    }
    
    if(!links) {
      db.set(`links`, [])
      
      return SendEmbed(interaction, {
        description: "❌ **|** Database ayarlanmadığı için otomatik ayarlandı, tekrardan aynı komutu kullanın!",
        color: "Red"
      });
    };
    
    if(!link.endsWith(".glitch.me")) {
      return SendEmbed(interaction, {
        description: "❌ **|** Uptime sistemime sadece `glitch` sitelerini ekliyebiliyorum.",
        color: "Red"
      });
    }
    
    db.set(`uptime_${interaction.user.id}`, { link: link });
    db.push(`links`, link);
    
    return SendEmbed(interaction, {
      color: "Green",
      description: "✅ **|** `"+link+"` sitesini uptime sistemime ekledim!"
    });
    
  }

};
