const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "YOUR TOKEN HERE!";

bot.on('ready',() => {
	bot.user.setStatus("dnd")
    console.log(`Logged as ${bot.user.username}`)

    //Status wechsel
    let statuses = [
        `s?help `,
        `on ${bot.guilds.cache.size} Guilds `,
        `on ${bot.users.cache.size} Users`

    ]
 
    setInterval(function(){
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, {type: "PLAYING"});
    }, 5000)
 
})
bot.on("message", async message => {
  if (message.author.bot) {
    return;

   }

    let content = message.content.toLowerCase();
 
    if(content.startsWith(`.purge`)){
    message.delete()
    let messages = message.content.split(" ").slice(1).join("");

    if(isNaN(messages)) return message.reply(" <:error:733331563881824298> Please specify a number").then(msg=>msg.delete({timeout:"5000"}));

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You have no Permissions.").then(msg=>msg.delete({timeout:"2500"}));
    message.channel.bulkDelete(messages)

    let embed = new Discord.MessageEmbed()
     .setTitle("Cleared Messages")
     .setColor('GREEN')
     .setDescription( messages + " Messages Deleted")
     .setFooter(`Cleared by ${message.author.username}`)
     .setTimestamp()
     .setThumbnail(message.author.displayAvatarURL());
     message.channel.send(embed).then(msg=>msg.delete({timeout:"50000"}));
 
 }

   if(content.startsWith(`.say`)){
  	
   let text = message.content.split(" ").slice(1).join(" ")
  
  	const embed = new Discord.MessageEmbed()
       .setColor('#E4B400')
       .setDescription(`${message.author.username} Sayed`, text)
       .setFooter(`Made by zItsTomFN`)
       message.channel.send(embed)
       message.delete()
  
  }
})

bot.login(token)
  
