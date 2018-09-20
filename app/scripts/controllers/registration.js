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
    this.firstPasswordInput = $('#password-reg')[0];

    // password validation
    this.validation = () => {
      this.errorMsg = [];
      if (this.firstPasswordInput.value.length < 4) {
        this.errorMsg.push('Password too small');
      } else if (this.firstPasswordInput.value.length > 30) {
        this.errorMsg.push('Password too big');
      }
      if (!this.firstPasswordInput.value.match(/[0-9]/g)) {
        this.errorMsg.push('Password need almost number');
      }
      if (!this.firstPasswordInput.value.match(/[\.\!\@\#\$\%\^\&\*]/g)) {
        this.errorMsg.push('Password need almost one of those symbols: ., !, @, #, $, %, ^, &, *');
      }
      if (!this.firstPasswordInput.value.match(/[a-z]/g)) {
        this.errorMsg.push('Password need almost one lowercase character');
      }
      if (!this.firstPasswordInput.value.match(/[A-Z]/g)) {
        this.errorMsg.push('Password need almost one uppercase character');
      }
      if (this.firstPasswordInput.value.match(/[^A-z0-9\.\!\@\#\$\%\^\&\*]/g)) {
        this.errorMsg.push('Password has invalid character');
      }
      //TODO: Error inifite loop
      if (this.errorMsg.length == 0) {
        this.signUp();
      } else {
        this.firstPasswordInput.setCustomValidity(this.errorMsg.join('\n'));
      }
    };

    //register new user
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

    //update/add user Information
    this.updateProfile = (user, name) => {
      user.updateProfile({
        displayName: name,
      }).catch(function (error) {
        // An error happened.
        console.log(error);
      });
    }
  });
