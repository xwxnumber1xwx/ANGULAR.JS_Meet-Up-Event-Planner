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

    const eventsRef = firebase.database().ref('/events');

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

    /* //add listener if database change. Async function (return a Promise)
    this.setAddListener = async () => {
      const eventsArray = [];
      await eventsRef.on('child_added', function (data) {
        console.log('child_added')
        console.log(data.val());
        eventsArray.push(data.val());
      });
      return eventsArray;
    }

    this.setChangeListener = async () => {
      let id = '';
      await eventsRef.on('child_changed', function (data) {
        console.log('child_changed')
        console.log(data.val());
        id = data.key;
      });
      return id;
    }

    this.setRemoveListener = async () => {
      let id = [];
      await eventsRef.on('child_removed', function (data) {
        console.log('child_removed')
        console.log(data.val());
        console.log(data.key);
        id.push(data.key);
        console.log(id);
      });
      console.log('return');
      console.log(id);
      return id.pop();
    } */

    //initialize Database
    this.addElement = (name, location, date, time, endTime) => {
      let user = this.getCurrentUser();
      if (user) {
        this.database = firebase.database();
        console.log(this.database);
        console.log(user);
        //write data on database
        this.setEvent(user.uid, user.displayName, name, location, date, time, endTime)
          .then(console.log('database wrote successfully'))
          .catch((err) => {
            console.log('error database');
            console.log(err);
          })
      }
    }

    //Write a new event
    this.setEvent = (uid, author, name, location, date, time, endTime) => {

      // get a key for new post
      let newPostKey = firebase.database().ref().child('posts').push().key

      let event = {
        uid: uid,
        author: author,
        name: name,
        location: location,
        date: date,
        time: time,
        endTime: endTime,
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
      eventsRef.once('value', (snapshot) => {
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
