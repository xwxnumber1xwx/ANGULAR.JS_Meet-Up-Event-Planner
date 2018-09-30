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
    const eventsRef = firebase.database().ref('/events');
    this.allEvents = [];
    this.ev = {
      name: '',
      location: '',
      date: '',
      time: '',
      endTime: ''
    };

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
        console.log('data');
        console.log(data);
        console.log('data.val()');
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
      console.log('event');
      console.log(this.ev);
      if (this.ev.name && this.ev.location && this.ev.date) {
        firebaseApi.addElement(this.ev.name, this.ev.location, this.ev.date, this.ev.time, this.ev.endTime);
        this.resetInput();
      }
    };

    this.resetInput = () => {
      this.ev = {
        name: '',
        location: '',
        date: '',
        time: '',
        endTime: ''
      }
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