const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const { uncache, nocache } = require('./lib/loader')
const figlet = require('figlet')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./Dzz.js')
nocache('../Dzz.js', module => console.log(color('[UPDATE]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))
require('./message/group.js')
nocache('../message/group.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))

const starts = async (dzz = new WAConnection()) => {
	dzz.logger.level = 'warn'
	console.log(color(figlet.textSync('DzBotz', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[ Dz ]', 'cyan'), color('Owner is online now!', 'green'))
	console.log(color('[ Dz ]', 'cyan'), color('Welcome back, Owner! Hope you are doing well~', 'green'))
	dzz.browserDescription = ["Made With - By Doomz", "Destop", "3.0.0"];

	// Menunggu QR
	dzz.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Scan QR Nya Stah'))
	})

	// Menghubungkan
	fs.existsSync(`./Dzz.json`) && dzz.loadAuthInfo(`./Dzz.json`)
	dzz.on('connecting', () => {
		console.log(color('[ WAIT ]', 'cyan'), color('Loading Cok.......'));
	})

	//connect
	dzz.on('open', () => {
		console.log(color('[ WAIT ]', 'cyan'), color('Bot is now online!'));
	})

	// session
	await dzz.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./Dzz.json`, JSON.stringify(dzz.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	dzz.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	dzz.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// welcome
	dzz.on('group-participants-update', async (anu) => {
		await welcome(dzz, anu)
	})

	dzz.on('chat-update', async (message) => {
		require('./Dzz.js')(dzz, message)
	})
}

starts()