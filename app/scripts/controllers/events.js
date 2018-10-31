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
    this.map = {};
    this.ev = {
      name: '',
      location: {
        name: '',
        lat: '',
        lng: ''
      },
      startDate: '',
      endDate: '',
      text: ''
    };

    this.showMaps = (name, id, lat, lng) => {
      var myLatLng = { lat: lat, lng: lng };
      if ($(`#map-${id}`).hasClass('not-show')) {
        this.map = new google.maps.Map(document.querySelector(`#map-${id}`), {
          center: myLatLng,
          zoom: 15
        });
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: name
        });
      }
      setTimeout(() => {
        $(`#map-${id}`).toggleClass('not-show');
      }, 300);
    };

    //add listener to Google Maps autocomplete
    autocomplete.addListener('place_changed', () => {
      console.log('autocomplete.getPlace()')
      console.log(autocomplete.getPlace());
      let address = autocomplete.getPlace().formatted_address;
      let placeName = autocomplete.getPlace().name;
      if (address) {
        if (address.includes(placeName)) {
          this.ev.location.name = address;
        } else {
          this.ev.location.name = `${placeName}, ${address}`;
        }
      }
      this.ev.location.lat = autocomplete.getPlace().geometry.location.lat();
      this.ev.location.lng = autocomplete.getPlace().geometry.location.lng();
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
      if (this.ev.name && this.ev.location && this.ev.startDate && this.ev.endDate) {
        firebaseApi.addElement(this.ev.name, this.ev.location, this.ev.startDate, this.ev.endDate, this.ev.text);
        this.clearInput();
      }
    };

    // clear all input value
    this.clearInput = () => {
      this.ev = {
        name: '',
        location: {
          name: '',
          lat: '',
          lng: ''
        },
        startDate: '',
        endDate: '',
        text: ''
      };
      $('.input').val('');
    };

    // Get Database
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
      if (a.startDate.valueOf() < b.startDate.valueOf()) {
        return -1;
      }
      if (a.startDate.valueOf() > b.startDate.valueOf()) {
        return 1;
      }
      return 0;
    }

    //delete old Events
    this.checkOldEvents = () => {
      for (let i = this.allEvents.length - 1; i >= 0; i--) {
        if (Date.parse(this.allEvents[i].endDate) < Date.now()) {
          console.log(`Event ${this.allEvents[i].name} was deleted because it has already passed`);
          this.deleteEvent(this.allEvents[i].eventid);
        }
      }
    }

    this.user = firebaseApi.getCurrentUser();
    this.setAddListener();
    this.setRemoveListener();
    //this.initMap();
    setTimeout(() => {
      this.checkOldEvents();
      this.allEvents.sort(this.compareEvents);
      $scope.$apply();
      //focus to first element (accessibility)
    document.getElementById('add-event-button').focus();
    }, 300);

    locationInput.addEventListener('change', function(value) {
      console.log('value');
      console.log(value.target.value.length);
      if (value.target.value.length > 24) {
        locationInput.style.fontSize = "45%";
      }
    });
    autosize(document.getElementsByClassName('resize'));

  }]);