'use strict';

/**
 * @ngdoc service
 * @name eventPlannerApp.firebaseApi
 * @description
 * # firebaseApi
 * Service in the eventPlannerApp.
 */
angular.module('eventPlannerApp')
  .service('firebaseApi', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //logIn
    this.login = (username, password) => {
      return firebase.auth().signInWithEmailAndPassword(username, password)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    };

    //check if user il logged
    this.getCurrentUser = () => {
      return firebase.auth().currentUser;
    }

    //logOut
    this.logOut = () => {
      return firebase.auth().signOut();
    }

    //initialize Database
    this.initDatabase = (name, location, date) => {
      let user = this.getCurrentUser();
      if (user) {
        this.database = firebase.database();
        console.log(this.database);
        console.log(user);
        //write data on database
        this.setEvent(user.uid, user.displayName, name, location, date)
          .then(console.log('database wrote successfully'))
          .catch((err) => {
            console.log('error database');
            console.log(err);
          })
      }
    }

    //Write a new event
    this.setEvent = (uid, author, name, location, date) => {

      // get a key for new post
      let newPostKey = firebase.database().ref().child('posts').push().key

      let event = {
        uid: uid,
        author: author,
        name: name,
        location: location,
        date: date,
        eventid: newPostKey
      }

        ;

      //creating object for write it on the database
      let updates = {};
      updates['/events/' + newPostKey] = event;

      return firebase.database().ref().update(updates);
    }

    //get events from database
    this.getDatabase = () => {
      let eventsArray = [];
      var events = firebase.database().ref('/events');
      events.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          //var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          eventsArray.push(childData);
        });
      });
      //console.log(eventsArray);
      return eventsArray;

      //return new Promise ((resolve) => {
      //resolve(eventsArray)
      //})
    }

    this.deleteElement = (eventId) => {
      console.log('delete is started')
      let eventRef = firebase.database().ref('events/' + eventId).remove();
      console.log('event deleted');
    }
  });
