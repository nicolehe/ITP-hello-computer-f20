// this is the code that will go in the index.js when you do the firebase init stuff and it creates a "functions" folder

const { dialogflow } = require("actions-on-google");
const functions = require("firebase-functions");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const app = dialogflow({ debug: true });

app.intent("Default Welcome Intent", (conv) => {
	conv.ask(`<speak>Hello, World!<break time="3s"/>Blah.</speak>`);
});

app.intent("get_fortune", (conv, params) => {
	//conv.ask("Hello, " + params.name + ", what did you dream about last night?");
	conv.ask(`Hello, ${params.name}, what did you dream about last night?`);
});

app.intent("dream", (conv) => {
	let dream = conv.query;
	let dreamSentiment = sentiment.analyze(dream);
	let life = "";

	if (dreamSentiment.score < -2) {
		life = `You're gonna have a horrible life!`;
	} else if (dreamSentiment.score >= -2 && dreamSentiment.score < 2) {
		life = `Your life will be mediocre.`;
	} else {
		life = `Go back to sleep because your life won't be better than that.`;
	}

	conv.ask(life);
});

app.intent("news", (conv) => {
	let ssml = `<speak><audio src="https://storage.googleapis.com/screamsss/scream.wav">didn't get the scream</audio></speak>`;
	conv.ask(ssml);
});

exports.fortuneTeller123 = functions.https.onRequest(app);
