
//angular.module('myApp')
//.factory('MessageService', ['$rootScope', '$q', 'Pubnub',
// function MessageServiceFactory($rootScope, $q, Pubnub) {

//     var self = this;
//     this.messages = []
//     this.channel = 'messages-channel';
//     // We keep track of the timetoken of the first message of the array
//     // so it will be easier to fetch the previous messages later
//     this.firstMessageTimeToken = null;
//     this.messagesAllFetched = false;
//     var subcribeNewMessage = function (callback) {
//         $rootScope.$on(Pubnub.getMessageEventNameFor(self.channel), callback);
//     };
//     var init = function () {
//         Pubnub.subscribe({
//             channel: self.channel,
//             triggerEvents: ['callback']
//         });
//         subcribeNewMessage(function(ngEvent, m) {
//             self.messages.push(m)
//             $rootScope.$digest()
//         })
//         }
//     init();


  

//     Pubnub.history({
//         channel: "messages-channel",
//         callback: function(payload){ console.log('Im called when the history is fetched')},
//         count: 20, // number of messages to retrieve, 100 is the default
//         reverse: false, // order to retrieve the messages, false is the default       
//     });

//     var populate = function () {

//         var defaultMessagesNumber = 20;

//         Pubnub.history({
//             channel: self.channel,
//             callback: function (m) {
//                 // Update the timetoken of the first message
//                 angular.extend(self.messages, m[0]);

//                 if (m[0].length < defaultMessagesNumber) {
//                     self.messagesAllFetched = true;
//                 }

//                 self.timeTokenFirstMessage = m[1]
//                 $rootScope.$digest()
//                 $rootScope.$emit('factory:message:populated')
//             },
//             count: 20
//         });
//     };

//     var getMessages = function () {
//         if (_.isEmpty(self.messages))
//             populate();
//         return self.messages;
//     };


//     var sendMessage = function (messageContent) {
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
//             }
//         });
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
//             count: 10,
//             start: self.timeTokenFirstMessage,
//             reverse: false
//         });

//         return deferred.promise
//     };

    
//     fetchPreviousMessages();
// getMessages();
//     // The service will return useful functions to interact with.
//     return {
//         getMessages: getMessages,
//         sendMessage: sendMessage,
//         subscribeNewMessage: subcribeNewMessage,
//         fetchPreviousMessages: fetchPreviousMessages
//     };

// }]);