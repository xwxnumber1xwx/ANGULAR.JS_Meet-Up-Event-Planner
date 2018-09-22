'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('EventsCtrl', ['firebaseApi', function (firebaseApi) {
    this.allEvents;

    this.init = () => {
      firebaseApi.initDatabase();
    }

    this.getDatabase = () => {
      this.allEvents = firebaseApi.getDatabase();
    }
  }]);
