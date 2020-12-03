

const express = require("express");
const app = express();
const dialogflow = require("@google-cloud/dialogflow");
const sessionClient = new dialogflow.SessionsClient({
	keyFilename: "YOUR SERVICE ACCOUNT JSON FILE PATH",
});

const projectId = "YOUR PROJECT ID";

app.use(express.static("public"));

// open localhost:5004 
const server = app.listen(5004, () => {
	console.log("listening on port 5004!");
});

const socketIO = require("socket.io");
const io = socketIO(server);

io.on("connection", (socket) => {
	console.log("new user: ", socket.id);

	// receive what the person said from the browser
	socket.on("send to dialogflow", (data) => {
		sessionClient
			.detectIntent({
				session: sessionClient.projectAgentSessionPath(projectId, "12345"),
				queryInput: { text: { text: data.query, languageCode: "en-US" } },
			})
			.then((response) => {
				const result = response[0].queryResult;
                console.log(result);
                
                let params = result.parameters.fields;
                let text = result.fulfillmentText;
                let intent = result.intent.displayName;
                socket.emit("stuff from df", {params, text, intent});

			});
	});
});
