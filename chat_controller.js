angular.module('myApp')
 .controller('ChatCtrl', function ($scope, Pubnub) {
     $scope.channel = 'messages-channel';
     // Generating a random uuid between 1 and 100 using an utility function from the lodash library.         
     $scope.uuid = _.random(100).toString();
     Pubnub.init({
         publish_key: 'pub-c-45ddabbf-3c71-41b8-8e21-5f0ac634b315',
         subscribe_key: 'sub-c-ac15ca04-88db-11e6-9125-02ee2ddab7fe',
         uuid: $scope.uuid
     });

     // Send the messages over PubNub Network
     $scope.sendMessage = function (isFromMe) {
         console.log("isFromMe: " + isFromMe);
         // Don't send an empty message 
         if (!$scope.messageContent || $scope.messageContent === '') {
             return;
         }
         if (isFromMe) {
             console.log(" mine case");
             setTimeout(function () {
                 $(".messageContent-" + $scope.uuid).removeClass("notmine");
                 $(".messageContent-" + $scope.uuid).addClass("mine");
                
             }, 200);      
         }

         Pubnub.publish({
             channel: $scope.channel,
             message: {
                 content: $scope.messageContent,
                 sender_uuid: $scope.uuid,
                 date: new Date()
             },
             callback: function (m) {
                 console.log(m);
             }
         });
         // Reset the messageContent input
         $scope.messageContent = '';

     }

     $scope.messages = [];

     // Subscribing to the ‘messages-channel’ and trigering the message callback
     Pubnub.subscribe({
         channel: $scope.channel,
         callback: receiveMessage
     });

     // I receive the message on the current channel.
     function receiveMessage(message) {
         console.log("receiveMessage");
         var isFromMe = false;
         // Check to make sure the message is not just being
         // echoed back.
         if (message.sender_uuid === $scope.uuid) {
             // This message has already been handled locally.
             console.log("the same user");
             isFromMe = true;
             return;
         }
         //// Add the message to the chat log.
         $scope.sendMessage(isFromMe);
     }

     // Listening to the callbacks
     $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {
         $scope.$apply(function () {
             $scope.messages.push(m)
         });
     });

 });

//angular.module('myApp').controller("ChatCtrl", function ($scope, Pubnub, MessageService) {
//    $scope.messages = MessageService;

//});

