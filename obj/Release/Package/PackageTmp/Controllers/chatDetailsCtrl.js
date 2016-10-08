angular.module('myApp').controller('chatDetailsCtrl', function ($scope, $route, $location, contactList, Contact, Pubnub, MessageService) {
    //console.log("chatDetailsCtrl");

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
    

    $scope.emoticon_url = "http://www.pic4ever.com/images/";
    $scope.emoticons = {
        ':-)': 'Bananeyessss.gif',
        ':D': 'bd3.gif',
        ':)': '183.gif',
        ':-D': 'Banane21.gif',
        ':*': 'Vishenka_11.gif',
        ':$': 'Vishenka_04.gif',
        ':coffee:': 'kaffeetrinker_2.gif',
        ':laugh:': '245.gif',
        ':bye:': '3.gif',
        ':3a': 'bl2.gif',
        ':(': '198.gif',
        ':V': '109.gif',
        '(Y)': '13.gif',
        ':O': 'be2.gif', 
        ':@': 'bd6.gif'
    };


    $scope.channel = $scope.contact.channel;
    $scope.messages = [];


    $scope.messages = MessageService.getHistory($scope.channel);

    // Generating a random uuid between 1 and 100 using an utility function from the lodash library.   
    $scope.uuid = PUBNUB.uuid();

    Pubnub.init({
        publish_key: 'pub-c-45ddabbf-3c71-41b8-8e21-5f0ac634b315',
        subscribe_key: 'sub-c-ac15ca04-88db-11e6-9125-02ee2ddab7fe',
        uuid: $scope.uuid
    });


    // Send the messages over PubNub Network
    $scope.sendMessage = function () {
        //Don't send an empty message 
        if ((!$scope.messageContent || $scope.messageContent === '') && (!$scope.image || $scope.image === '')) {
            return;
        }

        setTimeout(function () {
            $(".messageContent-" + $scope.uuid).removeClass("notmine");
            $(".messageContent-" + $scope.uuid).addClass("mine");
        }, 200);
       

        $("#scroll").animate({ scrollTop: $("#scroll")[0].scrollHeight }, 1000);

        Pubnub.publish({
            channel: $scope.channel,
            message: {
                content: $scope.replaceEmoticons($scope.messageContent),
                sender_uuid: $scope.uuid,
                date: new Date(),
                img: $scope.image
            },
            callback: function (m) {
                console.log(m);

            }
        });
        // Reset the messageContent input
        $scope.messageContent = '';
        $scope.image = '';
        $('#imgSrc').attr('src', '');
    }

    $scope.browseFun = function () {
        $("#browse").click();
    }

    // Subscribing to the ‘messages-channel’ and trigering the message callback
    Pubnub.subscribe({
        channel: $scope.channel,
        callback: receiveMessage,
    });


    // I receive the message on the current channel.
    function receiveMessage(message) {
        console.log("receiveMessage: " + message.content);
        $("#scroll").animate({ scrollTop: $("#scroll")[0].scrollHeight }, 1000);
    }


    $scope.replaceEmoticons = function (text) {
        patterns = [];
        metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

        // build a regex pattern for each defined property
        for (var i in $scope.emoticons) {
            if ($scope.emoticons.hasOwnProperty(i)) { // escape metacharacters
                patterns.push('(' + i.replace(metachars, "\\$&") + ')');
            }
        }

        // build the regular expression and replace
        return text.replace(new RegExp(patterns.join('|'), 'g'), function (match) {

            return typeof $scope.emoticons[match] != 'undefined' ?
              '<img src="' + $scope.emoticon_url + $scope.emoticons[match] + '"/>' :
              match;
        });
    }


})
    .directive('myUpload', [function () {
        return {
            restrict: 'A',
            link: function ($scope, elem, attrs) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    console.log(" e.target.result: " + e.target.result);

                    $scope.image = e.target.result;
                    $scope.$apply();
                }

                elem.on('change', function () {
                    reader.readAsDataURL(elem[0].files[0]);
                });
            }
        };
    }]);


angular.module('myApp')
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);