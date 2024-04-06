// import { initializeApp } from 'firebase/app';
import firebase from 'firebase'
import 'firebase/auth' 
import 'firebase/firestore' 

const firebaseConfig = {
    apiKey: "AIzaSyCWbhux1CD0aKSa4ueXAswc3rDReGa_f2E",
    authDomain: "olx-app-32d6c.firebaseapp.com",
    projectId: "olx-app-32d6c",
    storageBucket: "olx-app-32d6c.appspot.com",
    messagingSenderId: "539346358532",
    appId: "1:539346358532:web:b5c2181ab89a11ef398051",
    measurementId: "G-F90D8J2NVL"
};

export default firebase.initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export default db
