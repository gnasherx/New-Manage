var config = {
   apiKey: "AIzaSyANZrk_84aw8QHqcSotlVWE6Z3TzqvHM1I",
   authDomain: "manage-5da1a.firebaseapp.com",
   databaseURL: "https://manage-5da1a.firebaseio.com",
   projectId: "manage-5da1a",
   storageBucket: "manage-5da1a.appspot.com",
   messagingSenderId: "938828366786"
 };
 firebase.initializeApp(config);

 const database=firebase.database();
 var currentuser;
 var projectref,userRef,taskRef;
 var recentprojectname,recentprojectkey;
 var taskname, taskpurpose, taskpushkey;

 $(document).ready(function(){
    $('#fs_modal').hide();
    $('#fs_modal_invite').hide();

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

    $('#invite_people').click(function(){
        $('#fs_modal_invite').show();
        $('#client_ui').hide();
    });

    $('#cancel_task').click(function(){
        $('#fs_modal_invite').hide();
        $('#client_ui').show();
    });

    $('#fs_modal_close_btn_invite').click(function(){
        $('#fs_modal_invite').hide();
        $('#client_ui').show();
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      currentuser=user.uid;
      console.log(currentuser);
      projectref=database.ref('projects').child(currentuser);
      userRef=database.ref('users').child(currentuser);
      taskRef=database.ref('tasks').child(currentuser);
      recentProjectName();
      showAllTask();
      }
    });

    /*Project name and usesname*/
    function recentProjectName(){
       userRef.child('recentproject').once('value', function(snapshot){
       recentprojectname = snapshot.val().projectname;
       recentprojectkey=snapshot.val().projectkey;
       document.getElementById('team_name').innerText=recentprojectname;
      });
      userRef.once('value',function(snap){
        document.getElementById('team_menu_user_name').innerText=snap.val().username;
      });
      return true;
    }


    document.getElementById('save_channel').addEventListener('click',function(){
      taskname=document.getElementById('channel_create_title').value;
      taskpurpose=document.getElementById('channel_purpose_input').value;
      taskpushkey=taskRef.child(recentprojectkey).push().key;
      taskRef.child(recentprojectkey).child(taskpushkey).set({
        taskname:taskname,
        taskpurpose:taskpurpose,
        taskstartat:new Date().getTime()
      });
      userRef.child('recenttask').set({
        tasknamekey:taskpushkey
      });
      $('#fs_modal').hide();
      $('#client_ui').show();
    });

    function showAllTask(){
        userRef.child('recentproject').on('value', function(snapshot){
        recentprojectkey=snapshot.val().projectkey;
        console.log(recentprojectkey);
          taskRef.child(recentprojectkey).on('child_added',function(snap){
          var tasknamevalue=snap.val().taskname;
          console.log(tasknamevalue);
          renderTask(tasknamevalue);
          // userRef.child('recenttask').on('value',function(snapshot){
          // });
        });
      });
      return true;
   }

   function renderTask(tasknamevalue){
     var a=document.createElement('a');
     a.style.color="#D0D0D0";
     a.style.height="26px"
     a.style.fontWeight="500";
     a.style.lineHeight="1.2rem";
     a.style.position="relative";
     a.style.display="flex";
     a.style.cursor="pointer";
     a.style.padding="0 0.75rem 0 0";
     a.innerText=tasknamevalue;
     var tasklist=document.getElementById('task_list');
     tasklist.appendChild(a);

     return true;
   }

  // send message
  document.getElementById('type_a_message').addEventListener('keydown',function(e){
    if(e.keyCode==13){
        // var message=document.getElementById('type_a_message').value;
        console.log('click');

        var message = $(this).text();
        console.log(message);
        window.open('mailto:pawarg124@gmail.com');



    }
  });

});
