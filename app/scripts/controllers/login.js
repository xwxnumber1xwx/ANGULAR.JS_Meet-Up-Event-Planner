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
    this.email;
    this.password;
    this.user;
    this.displayName;

    //logIn
    this.logIn = () => {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          console.log(response);
          this.user = response.user;
          this.displayName = response.user.displayName;
          this.loggedYN();
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
    }

    //log out
    this.logOut = () => {
      firebase.auth().signOut();
      this.loggedYN();
      this.email = '';
      this.password = '';
      this.user = '';
      this.displayName = '';
    }

    this.loggedYN = () => {
      $('#events').toggleClass('disabled');
    }
  });