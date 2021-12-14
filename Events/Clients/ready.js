const{Client}= require("discord.js")
const mongoose = require("mongoose");
const {DataBase} = require("../../config.json");
module.exports = {
    name: "ready",
    once: true,
    /** 
     * @param {Client} client 
     */
    execute(client){
        console.log("The bot is on!");
        client.user.setActivity("HELLO",{type:"WATCHING"});
        if(!DataBase)return;
        mongoose.connect(DataBase,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        }).then(() =>{
            console.log("The client is now connected to the database!")
        }).catch((err) =>{
            console.log(err)
        })

    }
}