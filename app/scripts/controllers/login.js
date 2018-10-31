'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('LoginCtrl', ['$scope', 'firebaseApi', function ($scope, firebaseApi) {
    this.email = '';
    this.password = '';
    this.user = {};
    this.displayName = '';
    this.userLogged = false;

    setTimeout(function () {
      //focus for log in (Accessibility)
      document.getElementById('login-email').focus();
    }, 400);

    //check if user il logged
    this.getCurrentUser = () => {
      let user = firebaseApi.getCurrentUser();
      if (user) {
        console.log('User is already signed in.')
        // User is signed in.
        this.getUserInfo(user);
        this.loggedY();
        this.userLogged = true;
        setTimeout(function () {
          $scope.$apply();
        }, 300);
      }
    };

    //logIn
    this.logIn = () => {
      firebaseApi.login(this.email, this.password)
        .then((response) => {
          if (response) {
            this.getUserInfo(response.user);
            this.loggedY();
            this.userLogged = true;
            setTimeout(function () {
              $scope.$apply();
            }, 300);
          }
        })
    }


    //get and display user info
    this.getUserInfo = (user) => {
      this.logged = true
      this.user = user;
      this.displayName = user.displayName;
      this.email = user.email;
      this.info = `<p><b>Your information:</p><p>Name:</b><br>${this.displayName}<br><b>Email:</b><br>${this.email}<br></p>`
      $('#username').html(this.info);
    };

    //log out
    this.logOut = () => {
      firebaseApi.logOut()
        .then(() => {
          this.email = '';
          this.password = '';
          this.user = {};
          this.displayName = '';
          this.loggedN();
          this.userLogged = false;
          setTimeout(function () {
            $scope.$apply();
          }, 300);
        })
    };

    //toggle display element, only for logged users
    this.loggedY = () => {
      $('#events').removeClass('disabled');
      $('#signin').text('Log-Out');
      $('#signup').addClass('disabled');
      setTimeout(function () {
        //focus on user's information (Accessibility)
        document.getElementById('user-info').focus();
      }, 400);
    };

    this.loggedN = () => {
      //focus for log in (Accessibility)
      setTimeout(function () {
        document.getElementById('login-email').focus();
      }, 400);
      $('#events').addClass('disabled');
      $('#signin').text('Sign-In');
      $('#signup').removeClass('disabled');
    };

  }]);