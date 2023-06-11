// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu4jC8KpwkfcjxgGTbf8ouSXb0i4UayvM",
  authDomain: "anomaly-4ad8d.firebaseapp.com",
  projectId: "anomaly-4ad8d",
  storageBucket: "anomaly-4ad8d.appspot.com",
  messagingSenderId: "947151354808",
  appId: "1:947151354808:web:59d67a0dfafbe361762d4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
