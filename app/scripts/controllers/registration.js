'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('RegistrationCtrl', function () {
    this.name = '';
    this.email = '';
    this.password = '';
    this.user;

    this.signUp = () => {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          console.log(response.user);
          this.user = response.user;
          this.updateProfile(this.user, this.name);
          alert('user Successfully Registered')
        })
        .catch(function (error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    }

    //update user Information
    this.updateProfile = (user, name) => {
      user.updateProfile({
        displayName: name,
      }).then(function () {
        // Update successful.
        alert('Update successful');
      }).catch(function (error) {
        // An error happened.
        alert('An error happened.');
        console.log(error);
      });
    }
  });
