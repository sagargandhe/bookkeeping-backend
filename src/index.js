const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

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
