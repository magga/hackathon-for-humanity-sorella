const functions = require('firebase-functions');
const admin = require('firebase-admin');

const lineMainRoute = require('./src/line_main_route');
const buttonTest = require('./src/test_route/button_test');
const askForSharing = require('./src/cron_jobs/ask_for_sharing');
const buttonPressed = require('./src/button/button_pressed');

const serviceAccount = require('./src/secret/firebase_admin.json');
const { databaseURL } = require('./src/secret/firebase_database');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL
});

exports.lineMainRoute = functions.https.onRequest(lineMainRoute);
exports.buttonTest = functions.https.onRequest(buttonTest);

exports.askForSharing = functions.https.onRequest(askForSharing);

exports.buttonPressed = functions.https.onRequest(buttonPressed);
