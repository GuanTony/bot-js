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

let browser;
// fetch all members from guild
client.once('ready', async () => {
  browser = await puppeteer.launch();
  console.log(`Logged in as ${client.user.tag}!`);
  client.guilds.cache.get('1021506523140202618').members.fetch();
});

async function screenshotPage(url, file) {
  const page = await browser.newPage();
  await page.emulate(puppeteer.devices['iPad (gen 7)']);
  await page.goto(url);
  await page.screenshot({path: file, fullPage: true});
  await page.close();
}

async function rechercheMot(messageContent) {
  messageContent = messageContent.replace("!rechercheMot ", "");
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto("https://unifions.tonyguan3.repl.co/index.html");
  await page.waitForSelector('#searchInput');
  await page.$eval('#searchInput', (el, val) => el.value = val, messageContent);
  await page.screenshot({path: "./recherchetest.png", fullPage: true});
  await page.click('#searchButton');
  await page.waitForTimeout(200);

  await page.screenshot({path: "./rechercheMot.png", fullPage: true});
  await page.close();
}

client.on('messageCreate', async (message) => {
  switch (message.content) {
    case '!membres':
      message.channel.send(`Il y a ${client.guilds.cache.get('1021506523140202618').memberCount} membres sur le serveur`);
      break;
    case '!bonjour':
      message.channel.send(`Bonjour ${message.author.username}`);
      break;
    case '!recherche':
      await screenshotPage("https://soup.kagescan.fr", "full.png");
      message.channel.send({ files: ["./full.png"] });
      break;
    case '!histoire':
      await screenshotPage("https://unifions.tonyguan3.repl.co/histoire.html", "histoire.png");
      message.channel.send({ files: ["./histoire.png"] });
      break;
    case '!easteregg':
      await screenshotPage("https://th.bing.com/th/id/OIP.8wLhqVonagL-Je3R5emV2AHaM0?w=189&h=328&c=7&r=0&o=5&pid=1.7", "easteregg.png");
      message.channel.send({ files: ["./easteregg.png"] });
      break;      
  }

  if (message.content.startsWith("!rechercheMot ")) {
    await rechercheMot(message.content);
    message.channel.send({ files: ["./rechercheMot.png"] });
  }
})


client.login(token);

// Path: config.json