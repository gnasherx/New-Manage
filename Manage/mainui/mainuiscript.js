var config = {
   apiKey: "AIzaSyAmKtlVr0v38VXyzO3YU-Fjo7A4zxJQL1k",
   authDomain: "manage-1d80d.firebaseapp.com",
   databaseURL: "https://manage-1d80d.firebaseio.com",
   projectId: "manage-1d80d",
   storageBucket: "manage-1d80d.appspot.com",
   messagingSenderId: "768654120261"
 };

 firebase.initializeApp(config);
 const database=firebase.database();
 var currentuser;
 var projectref,userRef;
 var recentprojectname;
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
   currentuser=user.uid;
   console.log(currentuser);
   projectref=database.ref('projects').child(currentuser);
   userRef=database.ref('users').child(currentuser);
   recentProjectName();
   }
 });
$(document).ready(function(){
  $('#fs_modal').hide();

  $('#add_task').click(function(){
      $('#fs_modal').show();
      $('#client_ui').hide();
  });

  $('#cancel_task').click(function(){
      $('#fs_modal').hide();
      $('#client_ui').show();
  });

  $('#fs_modal_close_btn').click(function(){
      $('#fs_modal').hide();
      $('#client_ui').show();
  });

});


  function recentProjectName(){
    /*right now only showing recent new project added to firebase*/
    // TODO: change the recent project name which user doing right now.
    userRef.child('recentproject').once('value', function(snapshot){
     var recentProjectName = snapshot.val().projectname;
     document.getElementById('team_name').innerText=recentProjectName;
    });
    return true;
  }
