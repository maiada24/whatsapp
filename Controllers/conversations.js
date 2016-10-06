angular.module('myApp')
 .controller('conversationsCtrl', function ($scope, $route, $location, contactList, Contact) {
     contactList.Contacts = '[{"id":"1", "Name":"Jane Smith", "Picture":"img/boy.png", "channel":"channel1"},{"id":"2", "Name":"Angela Miller", "Picture":"img/girl.png", "channel":"channel2"},{"id":"3", "Name":"Morgan Williams", "Picture":"img/man.png", "channel":"channel3"},{"id":"4", "Name":"Natalie Michelle", "Picture":"img/wonan.png", "channel":"channel4"},{"id":"5", "Name":"Friends Group", "Picture":"img/users-group.png", "channel":"channel5"}]';
     contactList.Contacts = JSON.parse(contactList.Contacts);
     //console.log("$scope.contactList: " + contactList.Contacts);
     $scope.contactList = contactList.Contacts;
     $scope.getContactID = function (id) {
         Contact.ID = id;
         $location.path("/chatDetails");
         $route.reload();
     }
 });


