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
 var projectref;
 var recentprojectname;
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
   currentuser=user.uid;
   console.log(currentuser);
   projectref=database.ref('projects').child(currentuser);
   recentProjectName();
   }
 });

  function recentProjectName(){
    /*right now only showing recent new project added to firebase*/
    // TODO: change the recent project name which user doing right now.
    projectref.orderByChild('startdate').on('child_added', function(snapshot){
     var recentProject = snapshot.val().name;
     document.getElementById('team_name').innerText=recentProject;
    });
    return true;
  }
