import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const app = admin.initializeApp({
  credential: admin.credential.cert('./credentials/serviceaccountkey.json'),
  databaseURL: "https://minmi-67e75.firebaseio.com"
});
const db = admin.firestore();

exports.sendWelcomeEmail = functions.auth.user().onCreate(event  => {
    var docRef = db.collection('users').doc(event.data.uid);
    var setAda = docRef.set({
        photoURL: event.data.photoURL,
        email: event.data.email,
        displayName: event.data.displayName
    });
    return 0;
});

// export const register = functions.https.onRequest((request, response) => {
//   response.set('Access-Control-Allow-Origin', "*");
//   response.set('Access-Control-Allow-Methods', 'GET, POST');
//   const displayName = request.body.displayName;
//   const accountName = request.body.accountName;

//   response.send('{"status": "OK"}');
// });
