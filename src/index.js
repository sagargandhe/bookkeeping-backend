const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // If you're using other Firebase services that require a database URL, add it here
  // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

const db = admin.firestore();

async function addUser() {
  const docRef = db.collection('users').doc('alovelace');
  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });
  console.log('Document successfully written!');
}

addUser().catch(console.error);
