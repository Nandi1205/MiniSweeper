require('dotenv').config()

const fs = require('fs')
const {Client, GatewayIntentBits, InteractionType} = require('discord.js')
const commands = require('./commands.json')

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})
let commandFunctions = {}

client.once('ready', async () => {
  fs.readdirSync('./commands').forEach((commandFileName) => {
    commandFunctions[commandFileName.replace('.js', '')] = require('./commands/' + commandFileName)
  })

  //await client.guilds.cache.get(process.env.TEST_GUILD_ID).commands.set(commands)
  await client.application.commands.set(commands)

  console.info(client.user.username + ' is ready.')
})

client.on('interactionCreate', (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) commandFunctions[interaction.commandName](interaction)
})

client.login(process.env.TOKEN)