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
    this.username = '';
    this.password = '';
    this.email = '';
  });
