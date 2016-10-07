
angular.module('myApp')
.run(['Pubnub', function (Pubnub) {
   Pubnub.init({
        // Please signup to PubNub to use your own keys: https://admin.pubnub.com/
        publish_key: 'pub-c-45ddabbf-3c71-41b8-8e21-5f0ac634b315',
        subscribe_key: 'sub-c-ac15ca04-88db-11e6-9125-02ee2ddab7fe',
        uuid: _.random(100).toString()
     });
}]);


angular.module('myApp').factory('contactList', function () {
    return {
        Contacts: []
    };
});
angular.module('myApp').factory('Contact', function () {
    return {
        ID: 0
    };
});


angular.module('myApp').service('MessageService', ['$rootScope', 'Pubnub', '$pubnubChannel',
    function ($rootScope, Pubnub, $pubnubChannel) {
        // We create an extended $pubnubChannel channel object that add an additional sendMessage method
        // that publish a message with a predefined structure.
        var channell;

        var Channel;
       this.getChannel = function (channelName) {
            channell = channelName;
              Channel = $pubnubChannel.$extend({

              });
              return Channel(channell, {
                  autoload: 20,
                  presence: true
              });
        }
       
      

    }
]);


