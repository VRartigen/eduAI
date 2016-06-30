import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.setDefault('counter', 0);



Router.route('/',  {
    name : 'main',
    template : 'mainpage'
});

Router.route('/mainpage',  {
    name : 'page1',
    template : 'page1'
});

Router.route('/page2',  {
    name : 'questionpage',
    template : 'page2'
});

Router.route('/login', {
  name : 'login',
  template : 'login'
});

Router.route('/register', {
  name : 'register',
  template : 'register'
});

Router.route('/admin', {
  name : 'admin',
  template : 'admin'
});


Router.route('/page2/:_id', {
   template: 'page2',
   
   
});



Template.page2.events({
    'click .js-movetonextquestion': function(e) {
        Session.set('counter', Session.get('counter') + 1);
    },
   
    
    'click .speak' : function startDictation() {
    var id = event.target.name;
    console.log(id);
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
 
      var recognition = new webkitSpeechRecognition();
 
      recognition.continuous = false;
      recognition.interimResults = false;
 
      recognition.lang = "en-US";
      recognition.start();
 
      recognition.onresult = function(e) {
        var ans = e.results[0][0].transcript.split(" ");
        var arr1 = ['true','do','poo','poop','through','2', 'to','too','two','blue'];
        var arr2 = ['false','falls','fall','fault','faults','fun','phone','fonts','voice','ford'];
        var arr3 = ['inference'];
        var val = '';
        if(arr1.includes(ans[ans.length-1].toLowerCase())){
            val = arr1[0];
        }else if(arr2.includes(ans[ans.length-1].toLowerCase())){
            val = arr2[0];
        }else if(arr3.includes(ans[ans.length-1].toLowerCase())){
            val = arr3[0];
        }else{
            val = ans[ans.length-1]+' - please pronounce correctly';
            responsiveVoice.speak('Please pronounce correctly');
            setTimeout(5000);
        }
        
        

        
        document.getElementById('transcript'+id).value = val;
        var c = Session.get('counter');
        console.log("val 1 = "+Data.find({"unitno": Session.get("unitnoFilter")}).fetch()[0].q[c].ques[0].A.a1+" val2="+val);
         
        if(val == Data.find({"unitno": Session.get("unitnoFilter")}).fetch()[0].q[c].ques[0].A.a1){
            responsiveVoice.speak('Awesome! You are Correct');
            document.getElementById(id).innerHTML='Correct';
            document.getElementById(id).setAttribute("class","correct"); 
            responsiveVoice.speak('Lets move to the next question');
            
        }else{
            responsiveVoice.speak('The answer is Incorrect! Please try again else move to the next question');
            document.getElementById(id).innerHTML='Incorrect';
            document.getElementById(id).setAttribute("class","incorrect"); 
        }
        recognition.stop();
        
      };
 
      recognition.onerror = function(e) {
        
            recognition.stop();
        }
      
 
    }
  
 }
    
});

 Template.page2.helpers({
     
      
     questions: function() {
         var c=Session.get('counter');
          
         if(Session.get("unitnoFilter") && Data.find({"unitno": Session.get("unitnoFilter")}).fetch()[0].q[c]!==undefined){
             return Data.find({"unitno": Session.get("unitnoFilter")}).fetch()[0].q[c];
         }
         else {
             Session.set('counter', 0);
             Router.go('/mainPage');
         }
     },
     
     
     
     
 });



Template.mainpage.events({
  'click button':function(){
    Router.go('/')
  }
});

Template.register.events({
    'submit .register-form': function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        var firstname = event.target.firstname.value;
        var lastname = event.target.lastname.value;
       
        
        var user = {email:email , password:password , profile:{name:firstname +" "+lastname}};
 
        Accounts.createUser(user,function(err){
            if(!err) {
                Router.go('/admin');
            }
        });
    }
});


Template.login.events({
    'submit .login-form': function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
       
        Meteor.loginWithPassword(email,password,function(err){
            if(!err) {
                Router.go('/admin');
            }else{
                console.log("Wrong Credentials");
            }
        });
         
          console.log("userType=="+userType+", utype=="+utype);
          alert("Wrong User!!! Please select your usertype");
       
},'click .btn-facebook':function(event){ 
         event.preventDefault(); 
         Meteor.loginWithFacebook(function(err){ 
            if(!err) { 
                 Router.go('/admin'); 
             } 
         }); 
	}
});


Template.navigation.events({ 
     'click .btn-logout':function(){ 
         Meteor.logout(function(err){
      if(err){
        console.log('Error Logging out: '+ err);
      }
     Router.go('main'); 
  }); 
     } 
 }); 
 
 
 Template.admin.events({
     
     'submit .data':function(){
         event.preventDefault();
         var unitno = event.target.unitno.value;
         var para = event.target.para.value;
         var q1 = event.target.q1.value;
         var q2 = event.target.q2.value;
         var q3 = event.target.q3.value;
         var q4 = event.target.q4.value;
         var a1 = event.target.a1.value;
         var a2 = event.target.a2.value;
         var a3 = event.target.a3.value;
         var a4 = event.target.a4.value;
         
         
         if(Data.findOne({unitno :unitno})){ 
             console.log("Value found, push the new question");
             
             var questionInfo = {
                 unitno: unitno,
                 para: para,
                 q1: q1,
                 q2: q2,
                 q3: q3,
                 q4: q4,
                 a1: a1,
                 a2: a2,
                 a3: a3,
                 a4: a4
             }
             
             Meteor.call("pushQuestions", questionInfo ,function(error,result){
                 
                 if(!error) {
                     console.log("Successfully pushed");
                 }else{
                     console.log("Not Successfully pushed"+error);
                 }
                 
             });
             
         }else{
             console.log("Unit number not found. Inserting the value in database.");
             UnitNoData.insert({"unitno":unitno});
             Data.insert({
                "unitno":unitno,
                "q" : [ {
                        "para": para,
                        "ques": [{                      
                            "A": {
                                "q1": q1,
                                "a1": a1
                            },
                            "B": {
                                "q2": q2,
                                "a2": a2
                            },
                            "C": {
                                "q3": q3,
                                "a3": a3
                            },
                            "D": {
                                "q4": q4,
                                "a4": a4
                            }
                        }]
                  }]
            });
         }
         
         event.target.unitno.value = "";
         event.target.para.value = "";
         event.target.q1.value = "";
         event.target.q2.value = "";
         event.target.q3.value = "";
         event.target.q4.value = "";
         event.target.a1.value = "";
         event.target.a2.value = "";
         event.target.a3.value = "";
         event.target.a4.value = "";
     }
 });
 
 
 
Template.page1.events({
   'click .js-set-unitno': function(event){
       Session.set("unitnoFilter", this.unitno);
   } 
});
 
 
 Template.page1.helpers({
    unitnos:  function() {
        return UnitNoData.find({});
    } 
 });
 
    
        


 

 
 
 