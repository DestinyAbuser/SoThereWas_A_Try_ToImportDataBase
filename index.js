const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
//const {Client,Collection} = require('discord.js');
//const client = new Client(({ intents: 32767 }));
const {Token} = require("./config.json") ;
client.commands = new Collection()
require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);


const PREFIX = '!';

//BOT EMBED
client.on('message',message=>{
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){        
        case 'embed':
        const Moderator = message.guild.roles.cache.find(role => role.name == "Я ТУТ ГЛАВНЫЙ");
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#24DA95 ')
            .setTitle('Rules')
            .setThumbnail(message.guild.iconURL())
            .setDescription("Welcome to the cum zone Only cum inside anime girls  Quivering clit, double jointed pussy Fresh balls, elegant ejaculation First the kiss, then the cum")
            .addFields(
              { name: 'Regular field title', value: message.author.username },
              { name: 'User Role', value:("All Roles", `This is the ${Moderator ? `${Moderator}` : "Here you - just nobody"} role.`) },//add display of role
              { name: 'Current Server', value: message.guild.name},
              { name: 'Warm thanks from '+ message.guild.name, value: "Espesialy for you "+ message.author.username},
         )         
             
             .setImage(("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg"))
             .setTimestamp()
             .setFooter('Ur Welcome', message.guild.iconURL());

             message.channel.send({ embeds: [newEmbed] });
             break;
       
          };
    }
    
);
//BOT DEFAULT COMMANDS
client.on('message',message=>{
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case 'ping':
            message.channel.send('pong!');
            break;
        case 'link':
            message.channel.send('https://mangalib.me/darling-in-the-swamp?section=info://www.youtube.com/watch?v=OQsUnFDT7iE&list=PLbbLC0BLaGjoYVIoS6rms3aKtDtBJ4HtM&index=2');
            break;
        case 'info':
            if(args[1] === 'aboba'){
                message.channel.send('WOW WHAT A NICE COCK');
            }else{
                message.reply('pathetic penis');
            }
        case 'clear': 
            const deleteCount = parseInt(args[1], 10);
            if (!args[1]) return message.reply("Error invalid second arg")
            if (!deleteCount || deleteCount < 1 || deleteCount > 100) return;
            message.channel.bulkDelete(deleteCount + 1);    
            break;     
    }
});
//BOT STATUSES
client.on('message',message=>{
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case 'invisible':            
        client.user.setStatus('invisible');
        break;
    case 'online':
        client.user.setStatus('online')
        break;
    case 'idle':
        client.user.setStatus('idle');
        break;
    case 'dnd':
        client.user.setStatus('dnd');
        break;
    case 'status_null':
        client.user.setPresence({ activity: null });
        break;
    case 'dead':
        client.destroy();
        break;
    case 'depressed':
        client.user.setActivity("with depression", {
        type: "STREAMING",
        url: "https://www.twitch.tv/example-url"
    })
        break;
    }
});
//MUTE 


client.login(Token);
