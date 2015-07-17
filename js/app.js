var app = angular.module('MyTSM', ['ui.router', 'ngAnimate']);

app.factory('streamStatusManager', streamStatusManager);
//app.factory('redditManager', redditManager);

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
            $scope.pages = Games[$stateParams.gameKey]['pages'];
            $scope.links = Games[$stateParams.gameKey]['links'];
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

    // $stateProvider.state('page', {
    //     url: '/page/:gameKey/:pageKey',
    //     templateUrl: 'partials/page.html',
    //     controller: function ($stateParams, $scope) {
    //         $scope.game = Games[$stateParams.gameKey];
    //         $scope.page = $stateParams.pageKey;
    //     }
    // });

    $stateProvider.state('reddit', {
        url: '/:gameKey/reddit',
        templateUrl: 'partials/reddit.html',
        controller: 'redditController',
    });
});

app.run(function($interval, streamStatusManager) {
    streamStatusManager.refreshStatus();

    $interval(function () {
        streamStatusManager.refreshStatus();
        console.log('test');
    }, 1000 * 40); // every 60 sec
});