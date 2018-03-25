import * as firebase from "firebase";
import expenses from "../tests/fixtures/expenses";
import _ from "lodash";

const config = {
  apiKey: process.env.FIREBAE_API_KEY,
  authDomain: process.env.FIREBAE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

async function test() {
  try {
    await database.ref("attributes").set({
      height: 180,
      weight: 98
    });
    console.log("Async Data saved!");
  } catch (err) {
    console.log("Error:", err);
  }
}
