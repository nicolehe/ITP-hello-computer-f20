## Importing `fortune_teller_week6`

To import the agent into Dialogflow, right click the "fortune_teller_week6" folder and click "Compress fortune_teller_week6". It should create a file called `fortune_teller_week6.zip`.

In Dialogflow, click the gear under the logo on the left and then "Export and Import." Then either click "RESTORE FROM ZIP" or "IMPORT FROM ZIP" to import the zip file.

Make a note of your Google Project ID - it's in the General tab of your Dialogflow settings.

# Running the web app

Make sure to Enable billing, Enable the API, and Create a service account and download the private key file in [these instructions](https://cloud.google.com/dialogflow/es/docs/quick/setup).

To run:

```
cd webpage_stuff
node server.js
```

Or even better, install nodemon:

```
npm install -g nodemon
```

And run:

```
nodemon server.js
```

Open up `localhost:5004` in your browser.