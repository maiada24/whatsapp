angular.module('myApp').directive('messageList', function ($timeout, $anchorScroll, MessageService) {
    return {
        restrict: "E",
       
        templateUrl: 'components/message-list/message-list.html',
        link: function (scope, element, attrs, ctrl) {
            var element = angular.element(element)
            var init = function () { };
            init();
        },
        controller: function ($scope) {
            $scope.messages = MessageService;
            $scope.scrollToBottom = function () {
                var uuid_last_message = _.last($scope.messages).uuid;
                $anchorScroll(uuid_last_message);
            };
            $scope.listDidRender = function () {

                $scope.scrollToBottom();
            };
        }

    };
    $scope.autoScrollDown = true;
    var hasScrollReachedBottom = function () {
        return element.scrollTop() + element.innerHeight() >= element.prop('scrollHeight')
    };
    var watchScroll = function () {
        scope.autoScrollDown = hasScrollReachedBottom()
    };
});