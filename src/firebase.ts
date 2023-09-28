import admin from "firebase-admin";

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    projectId: process.env.PROJECT_ID,
  }),
});

export default firebaseApp;
