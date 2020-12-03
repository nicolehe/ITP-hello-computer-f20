const SpeechRecognition = webkitSpeechRecognition;
const synth = window.speechSynthesis;
const socket = io.connect();

const giphyAPIKey = "YOUR GIPHY API KEY";

// speech synthesis
const speak = (text) => {
	let utterThis = new SpeechSynthesisUtterance(text);
	document.querySelector("#computer-speech-div").textContent = text;
	synth.speak(utterThis);
};

// speech recognition
const getSpeech = () => {
	const recognition = new SpeechRecognition();

	recognition.start();

	recognition.onresult = (event) => {
		const speechResult = event.results[0][0].transcript;
		document.querySelector("#my-speech-div").textContent = speechResult;
		console.log("result: ", speechResult);

		// send what the person said to your server
		socket.emit("send to dialogflow", { query: speechResult });
	};
};

const getGif = (phrase) => {
	let url = `http://api.giphy.com/v1/gifs/random?api_key=${giphyAPIKey}&tag=${phrase}`;

	fetch(url, { mode: "cors" })
		.then((response) => response.json())
		.then((result) => {
			let imgUrl = result.data.image_url;
			document.querySelector("#the-gif").src = imgUrl;
		});
};

document.querySelector("#my-button").onclick = () => {
	getSpeech();
};

// receive from server
socket.on("stuff from df", (data) => {
	console.log(data.params);
	console.log(data.text);

	speak(data.text);
	getGif(data.params.image.stringValue);

	// here's another approach instead of writing the text in Dialogflow's UI:

	// if (data.intent == "bathroom") {
	// 	speak("Bathroom!");
	// }
});
