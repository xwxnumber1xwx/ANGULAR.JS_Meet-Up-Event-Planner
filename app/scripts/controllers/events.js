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
    this.allEvents = [];
    this.name;
    this.location;
    this.date;

    this.addEvent = () => {
      firebaseApi.initDatabase(this.name, this.location, this.date);
      this.resetInput();
    }

    this.resetInput = () => {
       this.name = '';
      this.location = '';
      this.date = '';
      $('.input').val('');
    }

    this.getDatabase = () => {
      this.allEvents = firebaseApi.getDatabase();
    }

  }]);
