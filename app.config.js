var user = {
    uuid: null,
    subscribed: false
};
var PubnubVar;
var channel = 'messages-channel';

angular.module('myApp')
.run(['Pubnub', function (Pubnub) {
   
     PubnubVar = Pubnub.init({
        // Please signup to PubNub to use your own keys: https://admin.pubnub.com/
        publish_key: 'pub-c-45ddabbf-3c71-41b8-8e21-5f0ac634b315',
        subscribe_key: 'sub-c-ac15ca04-88db-11e6-9125-02ee2ddab7fe',
        uuid: _.random(100).toString()
     });
     Pubnub.subscribe({
            channel: channel,
            triggerEvents: ['callback']
            //channel: channel,
            //callback: receiveMessage,
        });
    
}]);


//PubnubVar.subscribe({ channel: channel, content: receiveMessage });



angular.module('myApp').factory('MessageService', ['$rootScope', 'Pubnub', '$pubnubChannel',
    function MessageServiceFactory($rootScope, Pubnub, $pubnubChannel) {
        // We create an extended $pubnubChannel channel object that add an additional sendMessage method
        // that publish a message with a predefined structure.
        var Channel = $pubnubChannel.$extend({
            sendMessage: function (messageContent, isFromMe) {
                console.log(isFromMe);
                //if (isFromMe) {
                //    console.log("beforrrrrr"+isFromMe);
                //    $("#contentMsg").addClass("mine");
                //    console.log("afterrrrrrrrrr"+isFromMe);
                //}
                return this.$publish({
                    uuid: (Date.now() + _.random(100).toString()), // Add a uuid for each message sent to keep track of each message sent.
                    content: messageContent,
                    sender_uuid: _.random(100).toString(),
                    //uuid: user.uuid,
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



// I receive the message on the current channel.
//function receiveMessage(message) {
//    // Check to make sure the message is not just being
//    // echoed back.
//    if (message.uuid === user.uuid) {
//        // This message has already been handled locally.
//        return;
//    }
//    // Add the message to the chat log.
//    MessageService.sendMessage(message.message);
//}

