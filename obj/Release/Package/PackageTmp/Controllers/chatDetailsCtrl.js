angular.module('myApp').controller('chatDetailsCtrl', function ($scope, $route, $location, contactList, Contact, Pubnub, MessageService) {
    console.log("chatDetailsCtrl");

    var contactIndex = -1;
    //Search for contact by id
    jQuery.each(contactList.Contacts, function (index, value) {
        if (value.id === Contact.ID) {
            contactIndex = index;
            return false; // retrun false to stop the loops
        }
    });
    $scope.contact = contactList.Contacts[contactIndex];
    if (Contact.ID === 0) {
        $location.path("/conversations");
        $route.reload();
    }

    $scope.channel = $scope.contact.channel;
    $scope.messages = [];
    //console.log($scope.channel);

    $scope.messages = MessageService.getChannel($scope.channel);


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
            //Don't send an empty message 
            if (!$scope.messageContent || $scope.messageContent === '') {
                console.log("message content is emptyyy");
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



    // Subscribing to the ‘messages-channel’ and trigering the message callback
    Pubnub.subscribe({
        channel: $scope.channel,
        callback: receiveMessage
    });

    // I receive the message on the current channel.
    function receiveMessage(message) {
        console.log("receiveMessage: " + message.content);
        var isFromMe = false;
        // Check to make sure the message is not just being
        // echoed back.
        if (message.sender_uuid === $scope.uuid) {
            // This message has already been handled locally.
            console.log("the same user");
            isFromMe = true;
            return;
        }
    }
});