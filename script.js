var app = angular.module("teststeps", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/", {
            templateUrl: "step1.html"
            , controller: "step1Ctrl"
        })
        .when("/two", {
            templateUrl: "step2.html"
            , controller: "step2Ctrl"
        })
    ;
});

/*контролер первого шага*/
app.controller("step1Ctrl", [
    '$scope', '$location',
    function ($scope, $location) {

        $scope.step2 = false;
        $scope.step1Complite = false;

        /*предыдущие данные*/
        if (window.client === undefined) {
            $scope.client = {
                name: ''
                , age: ''
                , genre: ''
            };
        } else {
            $scope.client = window.client;
        }

        /*валидатор*/
        $scope.ValidateForm = function () {

            if ($scope.client.name.match(new RegExp(/^[а-яА-ЯёЁa-zA-Z0-9]+$/)) == null) {
                return false;
            }

            if ((isNaN(parseInt($scope.client.age))) || ((parseInt($scope.client.age) < 7) && (parseInt($scope.client.age) > 120))) {
                return false;
            }

            if ((isNaN(parseInt($scope.client.genre))) || (parseInt($scope.client.genre) < 1)) {
                return false;
            }

            return true;
        };

        /*событие далее*/
        $scope.next = function () {
            if ($scope.ValidateForm()) {
                window.client = $scope.client;
                $location.path('/two');
            }
        }
    }]);

/*контролер аторого шага*/
app.controller("step2Ctrl", ['$scope', '$location', function ($scope, $location) {
    $scope.step2 = true;
    $scope.step1Complite = true;

    if (window.client === undefined) {
        $location.path('/');
    } else {
        $scope.client = window.client;
        $scope.client.email = '';
        $scope.client.phone = '';
    }

    $scope.ValidateForm = function () {

        if ($scope.client.name.match(new RegExp(/^[а-яА-ЯёЁa-zA-Z0-9]+$/)) == null) {
            return false;
        }

        if ((isNaN(parseInt($scope.client.age))) || ((parseInt($scope.client.age) < 7) && (parseInt($scope.client.age) > 120))) {
            return false;
        }

        if ((isNaN(parseInt($scope.client.genre))) || (parseInt($scope.client.genre) < 1)) {
            return false;
        }

        if ($scope.client.email.match(new RegExp(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)) == null) {
            return false;
        }

        if ($scope.client.phone.length < 5) {
            return false;
        }

        return true;
    };

    $scope.next = function () {
        if ($scope.ValidateForm()) {
            window.client = $scope.client;
            alert('Отправляем данные на сервер. Говорим спасибо.');
        }
    }

}]);

app.directive('myStep', function () {
    return {
        templateUrl: 'stepComponent.html'
    };
});

