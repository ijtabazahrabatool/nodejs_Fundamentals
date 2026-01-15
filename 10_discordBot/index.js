 const {Client, GatewayIntentBits} = require("discord.js");
 const { connectToMongoDB } = require("./connect");
const {nanoid} = require("nanoid");
const URL = require("./model/url");

 const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
// connect to db 
    connectToMongoDB('mongodb://localhost:27017/botUrl')
    .then(() => console.log("Connected to MongoDB Successfully!"));


 client.on('messageCreate' ,async (message) =>{
    if(message.author.bot) return;
    if(message.content.startsWith('create')){
        const url = message.content.split("create")[1];
        if(!url){
            return message.reply("Url needed!")
        }

        const shortId = nanoid(8);
        // save to DB
        await URL.create({
            shortId: shortId,
            originalUrl: url
        });
        return message.reply({
            content: `Original URL: ${url}\n Short ID: ${shortId}`,
        });
    }


    message.reply({
        content: "Hi from Bot"
    })
 })

 client.on("interactionCreate", interaction => {
    console.log(interaction);
    interaction.reply("Pong!");
 })

 client.login("MTQ1Nzg2MDQ4MDAwODk3ODQ4NA.G492wI.hXL-NaIrmDwEcm9RvEFoft808fslRK277ffoNs")
