// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcVeHEBZxHJyOfg72FbEMdteCwHTzr8uY",
  authDomain: "a9-travelease.firebaseapp.com",
  projectId: "a9-travelease",
  storageBucket: "a9-travelease.firebasestorage.app",
  messagingSenderId: "303754337925",
  appId: "1:303754337925:web:23c3dbb214cc9ac8ab13ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;