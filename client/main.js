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
 