
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "kwachalite-ha6p0",
  "appId": "1:69452420607:web:fa4a8fb53d156440ec43ca",
  "storageBucket": "kwachalite-ha6p0.firebasestorage.app",
  "apiKey": "AIzaSyDS_BZa1lluc0CbrH-a7XqR-gDf8uH1aKA",
  "authDomain": "kwachalite-ha6p0.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "69452420607"
};

// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
