// to run a simple server, cd in your terminal to the folder these files are in and run:
// python -m SimpleHTTPServer 8007
// then go to http://localhost:8007 in your browser

const SpeechRecognition = webkitSpeechRecognition;
const giphyAPIKey = "YOUR API KEY";


const getSpeech = () => {
	const recognition = new SpeechRecognition();
	recognition.lang = "en-US";
	recognition.start();
	// recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onresult = (event) => {
		const speechResult = event.results[0][0].transcript;
		console.log("result: " + speechResult);
		console.log("confidence: " + event.results[0][0].confidence);
		document.querySelector("#speech-div").textContent = speechResult;
		getGif(speechResult);
	};

	recognition.onend = () => {
		console.log("it is over");

		recognition.stop();
		// getSpeech(); // uncomment for "endless mode"
	};

	recognition.onerror = (event) => {
		console.log("something went wrong: " + event.error);
	};
};

const getGif = (phrase) => {
	// same as:
	// let url = "http://api.giphy.com/v1/gifs/random?api_key=" + giphyAPIKey + "&tag=" + phrase;
	// more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	let url = `http://api.giphy.com/v1/gifs/random?api_key=${giphyAPIKey}&tag=${phrase}`;

	console.log(url);

	// more info: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	fetch(url, {
		mode: "cors",
	})
		.then((response) => response.json())
		.then((result) => {
			let imgUrl = result.data.image_url;
			document.querySelector("#the-gif").src = imgUrl;
		});
};

document.querySelector("#my-button").onclick = () => {
	console.log("clickity");
	getSpeech();
};
