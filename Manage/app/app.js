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
  var projectname;
  var projectref,userRef;
  var newProjectKey;

$(document).ready(function(){



  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    currentuser=user.uid;
    projectref=database.ref('projects').child(currentuser);
    userRef=database.ref('users').child(currentuser);
     show();

    } else {
    window.location.href="../index.html";
    }
  });

});



  $('#log_out').click(
    function(){
      firebase.auth().signOut().then(function() {
         window.location.href="../index.html";
      }).catch(function(error) {
        alert('error occured while signing you out!');
      });
    }
  );

document.getElementById('recent_project_name').addEventListener('click',function(){
  console.log('recent project');
  window.location.href="../mainui/mainuiindex.html";
});
 /*user isoc dropdown*/
 $("#userinfo-Dropdown").hide();
 document.getElementById('user-dropdown-toggle').addEventListener('click' ,openDropdown);
 function openDropdown(){
    $("#userinfo-Dropdown").toggle('fast')
 }

 /*add new project*/
 document.getElementById('submit_project_name').addEventListener('click', function(e){
   e.preventDefault();
   projectname=document.getElementById('project_name').value;
   newProjectKey = projectref.push().key;

   if(projectname !== ""){
     projectref.child(projectname).set({
       name:projectname,
       startdate:new Date().getTime(),
       projectkey:newProjectKey
      });

      /*Add recent project name to user details*/
      userRef.child('recentproject').set({
        projectname:projectname,
        projectkey:newProjectKey
      });

     document.getElementById('project_name').value='';
   }else{
     alert("You must enter a new project name!");
   }
   return true;
 });


 function show(){
    //retriveing database values

   projectref.orderByChild('startdate').on('child_added', function(snapshot){
    var nameofproject = snapshot.val().name;
    document.getElementById('recent_project_name').innerText=nameofproject;
    renderui(nameofproject);
    return true;
   });
    return true;
  }

  function renderui(project){
    var a=document.createElement('a');

    a.style.padding="8px 14px 9px";
    a.style.fontSize="15px";
    a.style.backgounrd="#FBFBFA";
    a.style.color="#555459";
    a.style.fontWeight="500";
    a.style.lineHeight="1.2rem";
    a.style.border="1px solid #A0A0A2"
    a.style.borderRadius=".25rem";
    a.style.boxShadow="none";
    a.style.position="relative";
    a.style.display="flex";
    a.style.textAlign="center";
    a.style.justifyContent="center";
    a.style.cursor="pointer";
    a.style.marginRight="4px";
    a.style.flexWrap="wrap";

     a.innerText=project;
     var projectlist=document.getElementById('project-list-name');
     projectlist.appendChild(a);

    $("#project-list-name").on("click",'a', function(event){
    var yourRecentProjectName=$(this).text();
    var recentProjectKey;
  //  window.location.href="../mainui/mainuiindex.html";

    projectref.child(yourRecentProjectName).once('value', function(snapshot){
      recentProjectKey = snapshot.val().projectkey;
        /*Add recent project name to user details*/
        userRef.child('recentproject').set({
        projectname:yourRecentProjectName,
        projectkey:recentProjectKey
      });
      /*top recenet project name for easy acces*/
     document.getElementById('recent_project_name').innerText=yourRecentProjectName;

    });


   });

     return true;
  }
