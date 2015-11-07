angular.module('starter', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaPush, $rootScope) {


    var androidConfig = {
      "senderID": "153796567304",
    };

    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      $cordovaPush.register(androidConfig).then(function (result) {
        // Success
      }, function (err) {
        // Error
      })


    });


    $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
      switch (notification.event) {
        case 'registered':
          if (notification.regid.length > 0) {
            alert('registration ID = ' + notification.regid);
            console.error("|" + notification.regid + "|");
          }
          break;

        case 'message':
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });


  })
