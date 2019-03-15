 import Rebase from 're-base';
 import firebase from 'firebase';

 const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAOuzvLjZarJjfj-zCZoSg8cmH1lgt0RGQ",
    authDomain: "catch-of-the-day-eb433.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-eb433.firebaseio.com",
});
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;