import { app } from "./FirebaseConfig.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const auth = getAuth(app);

const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = loginFunction;

password.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        loginFunction();
    }
});

username.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        loginFunction();
    }
});

function loginFunction() {
    signInWithEmailAndPassword(auth, username.value + "@gmail.com", password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);

            window.location.href = "/app/index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showModal();
        });
}

function showModal() {
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'), {});
    errorModal.show();
    setTimeout(() => {
        errorModal.hide();
    }, 3000); 
}

export { auth };
