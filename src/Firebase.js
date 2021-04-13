import firebase from 'firebase';

export default function Firebase() {
    return (null)
}

var firebaseConfig = {
    apiKey: "AIzaSyBMe2l8vlZtpooVwtZhoZyCEq2VHrkedRo",
    authDomain: "elec-403d7.firebaseapp.com",
    databaseURL: "https://elec-403d7-default-rtdb.firebaseio.com",
    projectId: "elec-403d7",
    storageBucket: "elec-403d7.appspot.com",
    messagingSenderId: "529368481209",
    appId: "1:529368481209:web:9ac73a7bdde769d048ca68",
    measurementId: "G-CWGMHMLBC4"
  };
  // Initialize Firebase

export const fbref = firebase.initializeApp(firebaseConfig)
// const refer = firebase.database()

// class DataTransfer{

// }