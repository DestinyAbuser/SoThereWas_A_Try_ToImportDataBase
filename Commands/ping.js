const {CommandInteraction} =require("discord.js");
module.exports={
    name:"Ping",
    description:"ping",
    permission:"ADMINISTRATOR",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction){
        interaction.reply({content:"pong"})
    }
}