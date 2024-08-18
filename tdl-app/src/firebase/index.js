import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAzXzTxKDtQ4n-E27NXIgmwQSWLFVUYQss",
    authDomain: "tdl-app-d2216.firebaseapp.com",
    projectId: "tdl-app-d2216",
    storageBucket: "tdl-app-d2216.appspot.com",
    messagingSenderId: "257219449159",
    appId: "1:257219449159:web:6ae3cc29df5aef3cf83c62",
    measurementId: "G-WJS3GHJJRP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;