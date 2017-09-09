//firebase reference
var config = {
   apiKey: "AIzaSyANZrk_84aw8QHqcSotlVWE6Z3TzqvHM1I",
   authDomain: "manage-5da1a.firebaseapp.com",
   databaseURL: "https://manage-5da1a.firebaseio.com",
   projectId: "manage-5da1a",
   storageBucket: "manage-5da1a.appspot.com",
   messagingSenderId: "938828366786"
 };
 firebase.initializeApp(config);

$(document).ready(function(){

    $('#show_signin_div').hide();

    $('#go_for_login').click(function(){
      $('#show_signup_div').hide();
      $('#show_signin_div').show();
    });

    $('#go_for_signup').click(function(){
      $('#show_signup_div').show();
      $('#show_signin_div').hide();
    });

});

  const firebaseRef=firebase.database().ref();
  var currentUser;//current user id
  var allfirebaseUserRef=firebaseRef.child('users');//user reference(users);

  //check the user state
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    console.log('Successfull');
    currentUser=user.uid;
    console.log(currentUser);

    //signup
    var signup_email = document.getElementById('signup_email').value;
    var signup_username = document.getElementById('signup_username').value;
    var signup_username = document.getElementById('signup_username').value;



    window.location.href="app/app.html";
    }
  });

  function createUser(signup_email, signup_username){
    const userRef=allfirebaseUserRef.child(currentUser).set({
      email:signup_email,
      username:signup_username
    });
    return true;
  }
  //Creating a new user
  document.getElementById('signup_form_content').addEventListener('submit' , signUpNewUser);
  function signUpNewUser(e){
    e.preventDefault();

    //signup
    var signup_email = document.getElementById('signup_email').value;
    var signup_password = document.getElementById('signup_pass').value;

    console.log(signup_email);
    firebase.auth().createUserWithEmailAndPassword(signup_email, signup_password)
    .then(function(){
        createUser(signup_email,signup_username);
    })
    .catch(function(error) {
    alert('SignupError:Error occured while adding your data into firebase!');
    });

  }

  //Signing in user
  document.getElementById('signin_form_content').addEventListener('submit',signInUser);
  function signInUser(e){
    e.preventDefault();

    //signin
    var signin_email=document.getElementById('signin_email').value;
    var signin_password=document.getElementById('signin_pass').value;

    firebase.auth().signInWithEmailAndPassword(signin_email, signin_password)
    .then(function(){
      checkUserIsSignedUp(signin_email,signin_password);
      window.location.href="app/app.html";
    })
      .catch(function(){
      alert('SigninError!');
    });
  }
  function checkUserIsSignedUp(signin_email,signin_password){
    allfirebaseUserRef.once('value')
      .then(function(snapshot){
          console.log(snapshot);
          if(snapshot.hasChild(currentUser)){
            window.location.href="app/app.html";
          }
        });
    return true;
  }
