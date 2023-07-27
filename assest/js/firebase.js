import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, get, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD8goCPxMDey5B9f5hxl2OMZwKnEz9YE1o",
    authDomain: "kyan-b2434.firebaseapp.com",
    databaseURL: "https://kyan-b2434-default-rtdb.firebaseio.com",
    projectId: "kyan-b2434",
    storageBucket: "kyan-b2434.appspot.com",
    messagingSenderId: "975438894207",
    appId: "1:975438894207:web:61a68ab809b524b97f1b4a",
    measurementId: "G-7R55E23LHM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export default {
    units: {
        auth,
        database
    },

    auth: {
        onAuthStateChanged
    },

    database: {
        ref,
        get
    }
}