const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./secret/firebase_admin.json');

const buttonHelp = require('./routes/button_help');
const buttonHelp2 = require('./routes/button_help2');
const linePushNotif = require('./routes/line_push_notif');
const lineBot = require('./routes/line_bot');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hackathon-9ad8e.firebaseio.com"
});

exports.buttonHelp = functions.https.onRequest(buttonHelp);
exports.buttonHelp2 = functions.https.onRequest(buttonHelp2);
exports.linePushNotif = functions.https.onRequest(linePushNotif);
exports.lineBot = functions.https.onRequest(lineBot);
