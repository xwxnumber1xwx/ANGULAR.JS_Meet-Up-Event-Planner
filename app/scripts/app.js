'use strict';

/**
 * @ngdoc overview
 * @name eventPlannerApp
 * @description
 * # eventPlannerApp
 *
 * Main module of the application.
 */
angular
  .module('eventPlannerApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl as main'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('registration', {
      url: '/registration',
      templateUrl: 'views/registration.html',
      controller: 'RegistrationCtrl as reg'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'views/events.html',
      controller: 'EventsCtrl as events'
    })
  }]);
