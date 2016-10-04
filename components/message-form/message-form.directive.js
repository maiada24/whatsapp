angular.module('myApp').directive('messageForm', function () {
    return {
        restrict: "E",

        templateUrl: 'components/message-form/message-form.html',
        scope: {},
        controller: function ($scope, MessageService) {
            $scope.uuid = _.random(100).toString();
            $scope.messageContent = '';
            $scope.sendMessage = function () {
                MessageService.sendMessage($scope.messageContent);
                $scope.messageContent = '';
            }
        }
    };
});