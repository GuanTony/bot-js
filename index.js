// generate a discord.js 14 app
const { Client, Intents } = require('discord.js');
const puppeteer = require('puppeteer');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

// fetch all members from guild
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.guilds.cache.get('1021506523140202618').members.fetch();
});

client.on('messageCreate', async (message) => {
    // make a command that posts an image of a random cat
    if (message.content === '!cat') {
        // get a random cat from the cat api
        fetch('http://random.cat/meow')
            .then(response => response.json())
            .then(data => {
                // send the cat image
                message.channel.send("test", { attachments: [data.file] });
            });
    }

  // recupere moi la position d'une div en javascript
  if (message.content === '!position') {
    message.channel.send("test", { files: ["./position.png"] });
  }

  // faire une fonction qui affiche le nombre de membres dans un serveur 
  if (message.content === '!membres') {
    message.channel.send(`Il y a ${client.guilds.cache.get('1021506523140202618').memberCount} membres sur le serveur`);
  }
  // faire une fonction qui affiche bonjour 
  if (message.content === '!bonjour') {
    message.channel.send(`Bonjour ${message.author.username}`);
  }

  // faire une commande qui donne le lien de cette page
  if (message.content === '!bot') {
    message.channel.send("https://discord.com/channels/1021506523140202618/1047986711856169020", { files: ["./index.html"] });
  }

  if (message.content === '!recherche') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices['iPad (gen 7)']);
    await page.goto('https://soup.kagescan.fr');
    await page.screenshot({path: 'full.png', fullPage: true});
    await browser.close();
    // upload the full.png in the channel
    message.channel.send({ files: ["./full.png"] });
  }  
  if (message.content === '!youtube') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices['iPad (gen 7)']);
    await page.goto('https://youtube.com');
    await page.screenshot({path: 'p.png', fullPage: true});
    await browser.close();
    // upload the full.png in the channel
    message.channel.send({ files: ["./p.png"] });
  }  
  // fait moi une fonction qui me donne le nombre de membres sur le serveur
  if (message.content === '!membres') {
    message.channel.send(`Il y a ${client.guilds.cache.get('1021506523140202618').memberCount} membres sur le serveur`);
  }
  if (message.content === '!histoire') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices['iPad (gen 7)']);
    await page.goto('https://unifions.tonyguan3.repl.co/histoire.html');
    await page.screenshot({path: 'histoire.png', fullPage: true});
    await browser.close();
    // upload the full.png in the channel
    message.channel.send({ files: ["./histoire.png"] });
  }  
  if (message.content === '!ph') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices['iPad (gen 7)']);
    await page.goto('https://www.pornhub.fr');
    await page.screenshot({path: 'ph.png', fullPage: true});
    await browser.close();
    // upload the full.png in the channel
    message.channel.send({ files: ["./ph.png"] });
  }  
  if (message.content === '!easteregg') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices['iPad (gen 7)']);
    await page.goto('https://th.bing.com/th/id/OIP.8wLhqVonagL-Je3R5emV2AHaM0?w=189&h=328&c=7&r=0&o=5&pid=1.7');
    await page.screenshot({path: 'easteregg.png', fullPage: true});
    await browser.close();
    // upload the full.png in the channel
    message.channel.send({ files: ["./easteregg.png"] });
  }  
  
  
})


client.login(token);

// Path: config.json