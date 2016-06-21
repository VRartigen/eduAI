import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/


Router.route('/',  {
    name : 'main',
    template : 'mainpage'
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


Template.mainpage.events({
  'click button':function(){
    Router.go('/page2')
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
         var q5 = event.target.q5.value;
         var a1 = event.target.a1.value;
         var a2 = event.target.a2.value;
         var a3 = event.target.a3.value;
         var a4 = event.target.a4.value;
         var a5 = event.target.a5.value;
         
         console.log(unitno+" P "+para+" Q1 "+q1+" Q2 "+q2+" "+q3+" "+q4+" "+q5+" "+a1+" "+a2+" "+a3+" "+a4+" "+a5);
         if(Data.findOne({unitno :unitno})){ 
             console.log("Value found, push the new question");
             
             var questionInfo = {
                 unitno: unitno,
                 para: para,
                 q1: q1,
                 q2: q2,
                 q3: q3,
                 q4: q4,
                 q5: q5,
                 a1: a1,
                 a2: a2,
                 a3: a3,
                 a4: a4,
                 a5: a5
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
             Data.insert({
                "unitno":unitno,
                "q" : [ {
                        "para": para,
                        "ques": {                      
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
                            },
                            "E": {
                                "q5": q5,
                                "a5": a5
                            }
                        }
                  }]
            });
         }
     }
 });
 

 
 
 