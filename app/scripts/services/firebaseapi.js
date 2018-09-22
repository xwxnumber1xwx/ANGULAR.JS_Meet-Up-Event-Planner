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
    this.initDatabase = () => {
      let user = this.getCurrentUser();
      if (user) {
        this.database = firebase.database();
        console.log(this.database);
        console.log(user);
        this.writeDatabase(user);
      }
    }

    //write data on database
    this.writeDatabase = (user) => {
      // TODO: variable need to be passed on the method
      let name = 'trip to italy';
      let location = 'Rome';
      let timestamp = 1577232000;

      this.setEvent(user.uid, user.displayName, name, location, timestamp)
        .then(console.log('database wrote successfully'))
        .catch((err) => {
          console.log('error database');
          console.log(err);
        })
    }

    //Write a new event
    this.setEvent = (uid, author, name, location, timestamp) => {
      let event = {
        uid: uid,
        author: author,
        name: name,
        location: location,
        timestamp: timestamp
      }

      // get a key for new post
      let newPostKey = firebase.database().ref().child('posts').push().key;

      //creating object for write it on the database
      let updates = {};
      updates['/events/' + newPostKey] = event;

      return firebase.database().ref().update(updates);
    }

    //get events from database
    this.getDatabase = () => {
      var events = firebase.database().ref('/events');
      events.on('value', (snapshot) => {
        console.log('getDatabase');
        console.log(snapshot.val());
        return snapshot.val();
      });
    }
  });