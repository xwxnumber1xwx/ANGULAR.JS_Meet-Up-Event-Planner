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
    //Firebase Database url
    const eventsRef = firebase.database().ref('/events');

    // Google Maps autocomplete
    const locationInput = document.querySelector('#event-location');
    let autocomplete = new google.maps.places.Autocomplete(locationInput);

    this.allEvents = [];
    this.user = {};
    this.ev = {
      name: '',
      location: '',
      date: '',
      time: '',
      endTime: ''
    };

    //add listener to Google Maps autocomplete
    autocomplete.addListener('place_changed', () => {
      console.log('autocomplete.getPlace()')
      console.log(autocomplete.getPlace())
      this.ev.location = `${autocomplete.getPlace().name}, ${autocomplete.getPlace().formatted_address}`;
      $scope.$apply();
    });

    //add element listener
    this.setAddListener = () => {
      eventsRef.on('child_added', (data) => {
        console.log('child_added');
        console.log('data.val()');
        console.log(data.val());
        this.allEvents.push(data.val());
      });
    }

    // remove element listener
    this.setRemoveListener = () => {
      eventsRef.on('child_removed', (data) => {
        console.log('child_removed');
        console.log(data.val());
        //Remove element from the allEvents list
        if (this.allEvents) {
          let index = this.allEvents.findIndex(x => x.eventid == data.key);
          this.allEvents.splice(index, 1);
        }
      });
    };

    // add an event
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
      this.allEvents.sort(this.compareEvents);
      console.log(this.allEvents);
      this.checkOldEvents();
    };

    // delete event
    this.deleteEvent = (id) => {
      console.log('deleting');
      firebaseApi.deleteElement(id);
      this.getDatabase();
    };

    //Sort array of object
    this.compareEvents = (a, b) => {
      if (a.date.valueOf() < b.date.valueOf()) {
        return -1;
      }
      if (a.date.valueOf() > b.date.valueOf()) {
        return 1;
      }
      return 0;
    }

    //delete old Events
    this.checkOldEvents = () => {
      for (let i = this.allEvents.length-1; i >= 0; i--) {
        if (Date.parse(this.allEvents[i].date) < Date.now()) {
          console.log(`Event ${this.allEvents[i].name} was deleted because it has already passed`);
          this.deleteEvent(this.allEvents[i].eventid);
        }
      }
    }

    this.user = firebaseApi.getCurrentUser();
    this.setAddListener();
    this.setRemoveListener();
    setTimeout(() => {
      this.checkOldEvents();
      this.allEvents.sort(this.compareEvents);
      $scope.$apply();
    }, 300)
  }]);