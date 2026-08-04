const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let isInitialized = false;

try {
  const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
  
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    isInitialized = true;
    console.log('Firebase Admin SDK initialized successfully via serviceAccountKey.json');
  } else {
    console.warn('WARNING: serviceAccountKey.json not found in backend directory. Firebase Auth will not work.');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

module.exports = { admin, isInitialized };
