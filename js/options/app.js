var app = angular.module('MyTsmSettings', ['ui.router', 'ngAnimate']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/general');

    $stateProvider.state('general', {
        url: '/general',
        templateUrl: 'options/partials/general.html'
    });

    $stateProvider.state('notifications', {
        url: '/notifications',
        templateUrl: 'options/partials/notifications.html',
        controller: 'notificationController'
    });

    
});