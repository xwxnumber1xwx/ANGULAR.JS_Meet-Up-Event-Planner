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
    this.allEvents = [];
    this.name = '';
    this.location = '';
    this.date = '';
    this.time = '';
    const eventsRef = firebase.database().ref('/events');

      // updating list every time an element is added
/*       firebaseApi.setAddListener()
        .then(response => {
          this.allEvents = response;
          console.log('allEvents');
          console.log(this.allEvents);
        }); */

      /* firebaseApi.setRemoveListener()
      .then(response => {
        console.log('firebaseApi.setRemoveListener()');
        console.log(response);
        this.removeElement(response[0]);
      }); */


    //add element listener
    this.setAddListener = async () => {
      await eventsRef.on('child_added', (data) => {
        console.log('child_added');
        console.log(data.val());
          this.allEvents.push(data.val());
      });
    }

    // remove element listener
    this.setRemoveListener = async () => {
      await eventsRef.on('child_removed', (data) => {
        console.log('child_removed');
        console.log(data.val());
        //Remove element from the allEvents list
        if (this.allEvents) {
          let index = this.allEvents.findIndex(x => x.eventid == data.key);
          this.allEvents.splice(index, 1);
        }
      });
    };

    this.addEvent = () => {
      if (this.name && this.location && this.date) {
        //for (let i = 0; i <= 10; i++) {
          firebaseApi.addElement(this.name, this.location, this.date, this.time);
          this.resetInput();
        //};
      }
    };

    this.resetInput = () => {
      this.name = '';
      this.location = '';
      this.date = '';
      this.time = '';
      $('.input').val('');
    };

    this.getDatabase = () => {
      this.allEvents = firebaseApi.getDatabase();
      console.log(this.allEvents);
    };

    this.deleteEvent = (id) => {
      console.log('deleting');
      firebaseApi.deleteElement(id);
      this.getDatabase();
    };

    this.setAddListener();
    this.setRemoveListener();
  }]);