const {Perms} = require("../Validation/Permissions");
const {Client} = require("discord.js");
const {promisify} = require("util");
const {glob} = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
/**
 * @param {Client} client
 */

module.exports = async (client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];
    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) =>{
        const command = require(file);
        
        if(!command.name)        
        return Table.addRow(file.split("/")[7],"YOU FAILED","Missing a name.")

        if(!command.description)
        return Table.addRow(command.name,"YOU FAILED","Missing a description.")

        if(command.permission){
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name,"YOU FAILED","Permission is invalid.")

        }
        client.command.set(command.name,command);
        CommandsArray.push(command);
        await Table.addRow(command.name, "SUCCESSFUL😎");

    });
    console.log(Table.toString());
    //PERMISSIONS CHECK(АЛЯ КОК ЧЕК)//
    client.on("ready",async() =>{
        const MainGuild = await client.guilds.cache.get("913854946082963457")

        MainGuild.commands.set(CommandsArray).then(async(commands)=>{
            const Roles = (commandName) =>{
                const cmdPerms = CommandsArray.find((c)=> c.name === commandName).permission;
                if(!cmdPerms) return null;
                
                return MainGuild.roles.cache.filter((r) => r.permission.has(cmdPerms));

            }
            const fullPermissions = commands.reduce((accumulator,r)=>{
                const roles = Roles(r.name);
                if(!roles) return accumulator;

                const permission = roles.reduce((a,r)=>{
                    return [...a,{id: r.id, type: "ROLE", permission:true}]                    
                },[])
                return [...accumulator,{id: r.id, permission }]
            },[])
            await MainGuild.commands.permissions.set({fullPermissions});
        })
    })
}