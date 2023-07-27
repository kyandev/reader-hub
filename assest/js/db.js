
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, get, set, update, onChildAdded } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth();


document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault()
    
    document.getElementById("signUpBtn").disabled = true
    document.getElementById("createAccountText").style.display = "none"
    document.getElementById("createAccountSpinner").style.display = "flex"
    
    var displayName = document.getElementById('Display_Name').value
    var user = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('passwd').value
    var confirmPass = document.getElementById('C_passwd').value


    if (password != confirmPass) {
        alert('confirm password has been not validated 🙄')

    } else {
        var users = [];
        var uniqueuser = false
        // check unique username
        get(ref(database)).then((e)=>{
            e.forEach(element => {
                users.push(element.val())
            });
        }).then(()=>{
            for (let index = 0; index < users.length; index++) {
                const element = users[index];
                if(element['user'] == user){
                    uniqueuser = true
                }
            }

            if (!uniqueuser) {

                if(!localStorage.getItem('type')){
                    alert('choose type')
                }else{
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((Auth) => {
                            // // Signed in 
                            let uid = Auth.user.uid
                            console.log(Auth.user)
                            updateProfile(Auth.user,{
                                displayName: displayName
                            }).then(()=>{
                                update(ref(database, `${uid}`), {
                                    "user": user,
                                    displayName,
                                    email,
                                    type:  parseInt(localStorage.getItem('type')),
                                    uid,
                                    password
                                }).then(() => {
                                    alert('user account created 🥳')
                                    localStorage.removeItem("type")
                                    location.href = "/"
                                })
                            })
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorMessage)
                            alert(errorMessage)
                            // ..
                        })
                }

    
            }
            else{
                alert("User Is Tekeen , Try Another User 😥 ")
            }

        })

    }
});