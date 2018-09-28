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
      this.errorMsg = ['Password: '];
      if (this.firstPasswordInput.value.length < 4) {
        this.errorMsg.push('too small,');
      } else if (this.firstPasswordInput.value.length > 30) {
        this.errorMsg.push('too big,');
      }
      if (!this.firstPasswordInput.value.match(/[0-9]/g)) {
        this.errorMsg.push('need almost number,');
      }
      if (!this.firstPasswordInput.value.match(/[\.\!\@\#\$\%\^\&\*]/g)) {
        this.errorMsg.push('need almost one of those symbols: ., !, @, #, $, %, ^, &, *,');
      }
      if (!this.firstPasswordInput.value.match(/[a-z]/g)) {
        this.errorMsg.push('need almost one lowercase character,');
      }
      if (!this.firstPasswordInput.value.match(/[A-Z]/g)) {
        this.errorMsg.push('need almost one uppercase character,');
      }
      if (this.firstPasswordInput.value.match(/[^A-z0-9\.\!\@\#\$\%\^\&\*]/g)) {
        this.errorMsg.push('has invalid character,');
      }
      if (this.errorMsg.length < 2) {
        this.signUp();
      } else {
        this.firstPasswordInput.setCustomValidity(this.errorMsg.join('\n'));
        setTimeout(() => {
          this.firstPasswordInput.setCustomValidity('');
        }, 3000);
      }
    };

    //register new user
    this.signUp = () => {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          console.log(response.user);
          this.user = response.user;
          this.updateProfile(this.user, this.name);
          document.location.href = `http://${document.location.host}/#!/login`
        })
        .catch(function (error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          alert(errorMessage)
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
