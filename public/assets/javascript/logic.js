document.addEventListener("DOMContentLoaded", function() {
    // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyD73WBIlPYp8IZgQlogpWLbVe-O1PSLLL8",
    //     authDomain: "quiz-app-64dbc.firebaseapp.com",
    //     databaseURL: "https://quiz-app-64dbc.firebaseio.com",
    //     projectId: "quiz-app-64dbc",
    //     storageBucket: "quiz-app-64dbc.appspot.com",
    //     messagingSenderId: "1002575042876"
    // };
    // firebase.initializeApp(config);

    // Get elements
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignUp");
    const btnLogout = document.getElementById("btnLogout");

    // Add login event
    btnLogin.addEventListener("click", e => {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        // Sign In
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });

    // Add sign up event
    btnSignUp.addEventListener("click", e => {
        // TODO: check for real email
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        // Sign In
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add realtime authentication listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
        }
    });
}());