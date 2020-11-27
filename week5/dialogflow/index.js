// this is the code that will go in the index.js when you do the firebase init stuff and it creates a "functions" folder

const { dialogflow, BasicCard, Button, Image } = require("actions-on-google");
const _ = require("lodash");
const functions = require("firebase-functions");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const fs = require("fs");
const symptomsRaw = fs.readFileSync("./symptoms.json");
const symptoms = JSON.parse(symptomsRaw);

const app = dialogflow();

app.intent("Default Welcome Intent", (conv) => {
	console.log("hellooo");
	conv.ask(`<speak>Hello, World!<break time="3s"/>Blah.</speak>`);
});

app.intent("get_fortune", (conv, params) => {
	//conv.ask("Hello, " + params.name + ", what did you dream about last night?");
	conv.data.name = params.name;
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

	conv.data.life = life;

	conv.ask("Very interesting Dream. Tell me, what is your favorite animal?");
});

app.intent("animal", (conv, params) => {
	conv.data.favAnimal = params.animal;
	conv.ask(
		`So ${conv.data.name}, your favorite animal is ${conv.data.favAnimal}. Fascinating. One more question: what city do you live in?`
	);
});

app.intent("city", (conv, params) => {
	conv.data.city = params.city;
	conv.data.symptom = _.sample(symptoms.symptoms);

	let fortune = `${conv.data.life} A ${conv.data.favAnimal} will visit you in ${conv.data.city} and you will experience ${conv.data.symptom}.`;
	conv.ask(fortune);
});

app.intent("news", (conv) => {
	let ssml = `<speak><audio src="https://storage.googleapis.com/screamsss/scream.wav">didn't get the scream</audio></speak>`;
	conv.ask(ssml);
});

app.intent("card", (conv) => {
	if (!conv.screen) {
		conv.ask(
			"Sorry, try this on a screen device or select the " +
				"phone surface in the simulator."
		);
		conv.ask("Which response would you like to see next?");
		return;
	}

	conv.ask(`Here's an example of a basic card.`);
	conv.ask(
		new BasicCard({
			text: `This is a basic card.  Text in a basic card can include "quotes" and
	  most other unicode characters including emojis.  Basic cards also support
	  some markdown formatting like *emphasis* or _italics_, **strong** or
	  __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
	  things like line  \nbreaks`, // Note the two spaces before '\n' required for
			// a line break to be rendered in the card.
			subtitle: "This is a subtitle",
			title: "Title: this is a title",
			buttons: new Button({
				title: "This is a button",
				url: "https://assistant.google.com/",
			}),
			image: new Image({
				url:
					"https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png",
				alt: "Image alternate text",
			}),
			display: "CROPPED",
		})
	);
	conv.ask("Which response would you like to see next?");
});

exports.fortuneTeller1234 = functions.https.onRequest(app);
