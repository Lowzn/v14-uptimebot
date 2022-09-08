const { Client, EmbedBuilder } = require("discord.js");
const { SendEmbed } = require("easyembeds.js");

module.exports = {
  name: "uptime-sil",
  description: "Sistemden link silin.",
  type: 1,
  options: [{
    type: 3,
    name: "link",
    description: "link",
    required: true
  }],

  run: async(client, interaction, db) => {

    const link = interaction.options.getString("link");
    const c = db.fetch(`uptime_${interaction.user.id}`)
    
    const links = db.fetch(`links`)
    
    if(!c) {
      return SendEmbed(interaction, {
        description: "❌ **|** Sistemde sana ait olan bir link bulunmuyor",
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
    
    if(!links.includes(link)) {
      return SendEmbed(interaction, {
        description: "❌ **|** Bu linki sistemimde göremiyorum.",
        color: "Red"
      });
    }
    
    db.delete(`uptime_${interaction.user.id}`)
    db.unpush(`links`, link)
    
    return SendEmbed(interaction, {
        description: "✅ **|** Sistemden başarıyla linkini sildim!",
        color: "Green"
      });
    
  }

};
