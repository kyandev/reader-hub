
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, get, set, update, onChildAdded } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const users = []

get(ref(database, "/")).then((e) => {

    e.forEach(element => {
        users.push(element.val())
    });

}).then(() => {
    document.getElementById("form").addEventListener("submit", function (su) {
        su.preventDefault();

        document.getElementById("loginBtn").disabled = true
        document.getElementById("logIn").style.display = "none"
        document.getElementById("logInAccountSpinner").style.display = "flex"

        let username = document.getElementById('username').value
        let passwd = document.getElementById('passwd').value
        let validate = false;
        let type = null;
        let userKey = null;

        let userEmail = null;
        let userPassword = null;

        for (let index = 0; index < users.length; index++) {
            if (users[index]['user'] == username && users[index]['password'] == passwd) {
                validate = true
                type = users[index]['type'];
                userKey = users[index]['uid']; // user key



                
                
                
                // form controller
                userEmail = users[index]['email']; // user key
                userPassword = users[index]['password']; // user key

            }
        }

        if (validate) {
            if (type == undefined || type == null || type == "null") {
                localStorage.setItem('regType', 1);
                localStorage.setItem('userKey', userKey);
                location.href = "../../register/select.html"
            } else {
                signInWithEmailAndPassword(auth, userEmail, userPassword).then((e) => {
                    location.href = "../../Home.html"
                })

            };

        } else {
            alert("wrong username or password");
        }

    })
})




