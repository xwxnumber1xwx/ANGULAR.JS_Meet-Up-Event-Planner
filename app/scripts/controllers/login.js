'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('LoginCtrl', function () {
    this.email = '';
    this.password = '';
    this.user = {};
    this.displayName = '';

    //check if user il logged
    this.getCurrentUser = () => {
      let user = firebase.auth().currentUser;
        if (user) {
          console.log('User is already signed in.')
          // User is signed in.
          this.getUserInfo(user);
          this.loggedY();
        }
      };

    //logIn
    this.logIn = () => {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          this.getUserInfo(response.user);
          this.loggedY();
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    };
    //get and display user info
    this.getUserInfo = (user) => {
      this.logged = true
      this.user = user;
      this.displayName = user.displayName;
      this.email = user.email;
      this.info = `<p><b>Your information:<br>Name:</b> ${this.displayName}<br><b>Email:</b> ${this.email}</p>`
      $('#username').html(this.info);
    };

    //log out
    this.logOut = () => {
      firebase.auth().signOut()
        .then(() => {
          this.email = '';
          this.password = '';
          this.user = {};
          this.displayName = '';
          this.loggedN();
        })
    };

    //toggle display element, only for logged users
    this.loggedY = () => {
      $('#events').removeClass('disabled');
      $('#login').addClass('disabled');
      $('#logged').removeClass('disabled');
      $('#signin').text('Log-Out');
      $('#signup').addClass('disabled');
    };

    this.loggedN = () => {
      $('#events').addClass('disabled');
      $('#login').removeClass('disabled');
      $('#logged').addClass('disabled');
      $('#signin').text('Sign-In');
      $('#signup').removeClass('disabled');
    };

  });