var app = angular.module('MyTSM', ['ui.router']);

app.factory('streamStatusManager', streamStatusManager);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/games');

    $stateProvider.state('games', {
        url: '/games',
        templateUrl: 'partials/games.html',
        controller: function ($scope) {
            $scope.games = Games;
        }
    });

    $stateProvider.state('game', {
        url: '/game/:gameKey',
        templateUrl: 'partials/game.html',
        controller: function ($stateParams, $scope) {
            $scope.game = Games[$stateParams.gameKey];
        }
    });

    $stateProvider.state('streams', {
        url: '/streams/:gameKey',
        templateUrl: 'partials/streams.html',
        controller: function ($stateParams, $scope, streamStatusManager) {
            $scope.game = Games[$stateParams.gameKey];
            $scope.streamStatusManager = streamStatusManager;
        }
    });
});

app.run(function($interval, streamStatusManager) {
    streamStatusManager.refreshStatus();

    $interval(function () {
        streamStatusManager.refreshStatus();
    }, 1000 * 60); // every 60 sec
});