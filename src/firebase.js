import firebase from 'firebase/app'
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB3jCgTrlseerL6Uqvg4panyaOrwl64PKM",
    authDomain: "react-crud-efa69.firebaseapp.com",
    projectId: "react-crud-efa69",
    storageBucket: "react-crud-efa69.appspot.com",
    messagingSenderId: "225002651465",
    appId: "1:225002651465:web:876650e33cd073a6e3e498",
    measurementId: "G-H9WTCH2EGZ"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();