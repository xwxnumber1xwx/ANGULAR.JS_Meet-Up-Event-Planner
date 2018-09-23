'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('EventsCtrl', ['$scope', 'firebaseApi', function ($scope, firebaseApi) {
    this.allEvents;
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
      console.log(this.allEvents);
      /* .then(response => {
        console.log(response);
        this.allEvents = response;
      }) */
    }

    this.deleteEvent = (id) => {
      console.log('deleting');
      firebaseApi.deleteElement(id);
      this.getDatabase();
    }
  }]);