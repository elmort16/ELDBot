const SteamUser = require('steam-user');
const fs = require('fs');
const steam = require('steam');
const readlineSync = require('readline-sync');
const client = new SteamUser();

console.log("Thank you for using Voaxsiz's Bot.\nYou can leave from the program with Ctrl+C\n\n\n\n\n");


const clientUsername = readlineSync.question("What is the account's username?:	");
const clientPassword = readlineSync.question("What is the account's password?:	" , { hideEchoBack: true });

//const clientAdmin = readline.question("Please write your steam64 ID:	"); //Use this if you will use in a bot account

const logOnOptions = {
		accountName: clientUsername,
		password: clientPassword
};

console.log("Waiting for the Steam...");

client.logOn(logOnOptions);

client.on('loggedOn', () => {
		console.log("[Bot][" + clientUsername + "] Has successfully logged-in");
		client.setPersona(SteamUser.Steam.EPersonaState.Online);
		if (readlineSync.keyInYN("Do you want to hour boost?:	") === true) {
		const clientGames = readlineSync.question("Please write the games that you want to boost:	");
		const clientGamesPlayed = clientGames.split(/[,\s]+/).map(value => +value);
		client.gamesPlayed(clientGamesPlayed);
		console.log("Writen games are boosting right now.");
		}
});

client.on("friendMessage", function(steamID, message, type) {
	client.getPersonas([steamID], function(personas) {
	var persona = personas[steamID];
	var name = persona ? persona.player_name : ("[" + steamID + "]");
		
	if (message == "sa" || message == "Sa" || message == "SA" || message == "Sea" || message == "SeA" || message == "sea") {
		console.log("New message! | " + name + ": " + message);
		client.chatMessage(steamID, "As");
	}
	else if (message == "!commands") {
		console.log("New message! | " + name + ": " + message);
		client.chatMessage(steamID, 'Commands --> "!whois" ; Admin Commands --> "!exit" "!play" "!run" "!normal"');
	}
	else if (message == "!normal") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.gamesPlayed([10,    //Change here by your choices
    	  	240,
    	    219740,
        	413150,
        	242680,
        	6060,
        	6000,
        	322170,
        	4000,
        	398680,
        	205950,
        	70000,
        	70,
        	220,
        	320,
        	360,
        	280,
        	30,
        	300,
        	57690,
        	211820,
        	108600,
        	342300,
        	620,
        	329430,
        	24960,
        	3810,
        	3820,
        	221380,
        	219640,
        	45740,
        	80,
        	271590]);
        	client.setPersona(SteamUser.Steam.EPersonaState.Online);
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message == "!whois") {
		console.log("New message! | " + name + ": " + message);
		client.chatMessage(steamID, "This bot codded by Voaxsiz");
	}
	else if (message == "!exit") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.chatMessage(steamID, "Bot closing down, sir!");
			process.exit();
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message.indexOf("!run ") > -1) {
		console.log("New message! | " + name + ": " + message);
    		if (steamID.getSteamID64() === clientAdmin) {
    			if (message.charAt(0)=='!') {
					var number_start=message.indexOf("un");
					var snumber= "";
					number_start+=3;
       						for (i = number_start; i < message.length; i++) { 
       	    				snumber += message.charAt(i);
       						}
					var gameId = parseInt(snumber);
					client.gamesPlayed(gameId);
					client.chatMessage(steamID, "Games are running right now."); }
			}
			else {
				client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message.indexOf("!play ") === 0) {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			var gameId = message.substring("!play ".length);
			client.gamesPlayed(gameId);
			client.chatMessage(steamID, "Custom Game is running right now.");
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else {
		console.log("New message! | " + name + ": " + message);
		client.chatMessage(steamID, '[AutoReply]Hey, Iam busy right now. I will be in touch with you soon. Type "!commands" if you want to see commands');
	}
});
});

client.on('error', function(e) {
console.log('[Bot][' + clientUsername + '] Error Logon Failed.');
    if (e.eresult == SteamUser.EResult.InvalidPassword)
    {
    console.log('Reason: invalid password.');
	console.log('Press Ctrl+C to exit from program.');
    }
    else if (e.eresult == SteamUser.EResult.AlreadyLoggedInElsewhere)
    {
    console.log('Reason: already logged in elsewhere.');
	console.log('Press Ctrl+C to exit from program.');
    }
    else if (e.eresult == SteamUser.EResult.AccountLogonDenied)
    {
    console.log('Reason: logon denied - steam guard needed.');
	console.log('Press Ctrl+C to exit from program.');
    }
});



/* TODO
	rememberPassword: true
	else if (message == "!relog") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.chatMessage(steamID, "Relogging...");
			client.relog();
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message == "!set") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.chatMessage(steamID, 'Usage: "!set online" "!set busy" "!set away" "!set snooze" "!set offline"');
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message == "!set online") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.setPersona(SteamUser.Steam.EPersonaState.Online);
			client.chatMessage(steamID, 'Bot Voaxsiz now Online');
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message == "!set busy") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.setPersona(SteamUser.Steam.EPersonaState.Busy);
			client.chatMessage(steamID, 'Bot Voaxsiz now Busy');
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message == "!set away") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.setPersona(SteamUser.Steam.EPersonaState.Away);
			client.chatMessage(steamID, 'Bot Voaxsiz now Away');
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message == "!set snooze") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.setPersona(SteamUser.Steam.EPersonaState.Snooze);
			client.chatMessage(steamID, 'Bot Voaxsiz now Snooze');
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
	else if (message == "!set offline") {
		console.log("New message! | " + name + ": " + message);
		if (steamID.getSteamID64() === clientAdmin) {
			client.setPersona(SteamUser.Steam.EPersonaState.Offline);
			client.chatMessage(steamID, 'Bot Voaxsiz now Offline');
		}
		else {
			client.chatMessage(steamID, "You are not an admin!");
		}
	}
*/