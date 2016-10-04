angular.module('myApp')
.run(['Pubnub', function (Pubnub) {
    var channel = 'messages-channel';
    Pubnub.init({
        // Please signup to PubNub to use your own keys: https://admin.pubnub.com/
        publish_key: 'pub-c-45ddabbf-3c71-41b8-8e21-5f0ac634b315',
        subscribe_key: 'sub-c-ac15ca04-88db-11e6-9125-02ee2ddab7fe',
        uuid: _.random(100).toString()
    });
    Pubnub.subscribe({
        channel: channel,
        triggerEvents: ['callback']
    });
}]);




angular.module('myApp').factory('MessageService', ['$rootScope', 'Pubnub', '$pubnubChannel',
    function MessageServiceFactory($rootScope, Pubnub, $pubnubChannel) {
        // We create an extended $pubnubChannel channel object that add an additional sendMessage method
        // that publish a message with a predefined structure.
        var Channel = $pubnubChannel.$extend({
            sendMessage: function (messageContent) {
                return this.$publish({
                    uuid: (Date.now() + _.random(100).toString()), // Add a uuid for each message sent to keep track of each message sent.
                    content: messageContent,
                    sender_uuid: _.random(100).toString(),
                    date: Date.now()
                })
            }
        });
        return Channel('messages-channel', {
            autoload: 20,
            presence: true
        });
    }
]);


//angular.module('myApp')
//.factory('MessageService', ['$rootScope', '$q', 'Pubnub',
// function MessageServiceFactory($rootScope, $q, Pubnub) {

//     // Aliasing this by self so we can access to this trough self in the inner functions
//     var self = this;
//     this.messages = []
//     this.channel = 'messages-channel';

//     // We keep track of the timetoken of the first message of the array
//     // so it will be easier to fetch the previous messages later
//     this.firstMessageTimeToken = null;
//     this.messagesAllFetched = false;



//     var init = function () {

//         Pubnub.subscribe({
//             channel: self.channel,
//             triggerEvents: ['callback']
//         });

//         Pubnub.time(function (time) {
//             self.firstMessageTimeToken = time;
//         })

//         subcribeNewMessage(function (ngEvent, m) {
//             self.messages.push(m)
//             $rootScope.$digest()
//         });

//     };

//     var populate = function () {

//         var defaultMessagesNumber = 20;

//         Pubnub.history({
//             channel: self.channel,
//             callback: function (m) {
//                 // Update the timetoken of the first message
//                 self.timeTokenFirstMessage = m[1]
//                 angular.extend(self.messages, m[0]);

//                 if (m[0].length < defaultMessagesNumber) {
//                     self.messagesAllFetched = true;
//                 }

//                 $rootScope.$digest()
//                 $rootScope.$emit('factory:message:populated')

//             },
//             count: defaultMessagesNumber,
//             reverse: false
//         });

//     };

//     ////////////////// PUBLIC API ////////////////////////

//     var subcribeNewMessage = function (callback) {
//         $rootScope.$on(Pubnub.getMessageEventNameFor(self.channel), callback);
//     };


//     var fetchPreviousMessages = function () {

//         var defaultMessagesNumber = 10;

//         var deferred = $q.defer()

//         Pubnub.history({
//             channel: self.channel,
//             callback: function (m) {
//                 // Update the timetoken of the first message
//                 self.timeTokenFirstMessage = m[1]
//                 Array.prototype.unshift.apply(self.messages, m[0])

//                 if (m[0].length < defaultMessagesNumber) {
//                     self.messagesAllFetched = true;
//                 }

//                 $rootScope.$digest()
//                 deferred.resolve(m)

//             },
//             error: function (m) {
//                 deferred.reject(m)
//             },
//             count: defaultMessagesNumber,
//             start: self.timeTokenFirstMessage,
//             reverse: false
//         });

//         return deferred.promise
//     };


//     var getMessages = function () {

//         if (_.isEmpty(self.messages))
//             populate();

//         return self.messages;

//     };

//     var messagesAllFetched = function () {

//         return self.messagesAllFetched;

//     };

//     var sendMessage = function (messageContent) {
//         console.log("heereeee send message");
//         // Don't send an empty message 
//         if (_.isEmpty(messageContent))
//             return;

//         Pubnub.publish({
//             channel: self.channel,
//             message: {
//                 uuid: (Date.now() + _.random(100).toString()),
//                 content: messageContent,
//                 sender_uuid: _.random(100).toString(),
//                 date: Date.now()
//             },
//         });
//     };


//     fetchPreviousMessages();

//     // The public API interface
//     return {
//         getMessages: getMessages,
//         sendMessage: sendMessage,
//         subscribeNewMessage: subcribeNewMessage,
//         fetchPreviousMessages: fetchPreviousMessages,
//         messagesAllFetched: messagesAllFetched
//     }

// }]);