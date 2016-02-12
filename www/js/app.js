// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('air', ['ionic',
    'intlpnIonic',
    'air.controllers',
    'air.controllers.account',
    'air.services',
    'air.services.account',
    'air.services.transaction'])

    .constant('API', 'https://app.zapgo.co/api/1')

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('sell_keypad', {
                url: '/sell_keypad',
                templateUrl: 'templates/keypad.html',
                controller: 'SellKeypadCtrl'
            })

            .state('sell_success', {
                url: '/sell_success',
                templateUrl: 'templates/sell_success.html',
                params: {
                    amount: null
                }
            })

            .state('app.sell_btc_keypad', {
                url: '/sell_btc_keypad',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/keypad.html',
                        controller: 'SellKeypadCtrl'
                    }
                }
            })

            .state('app.buy_btc_keypad', {
                url: '/buy_btc_keypad',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/keypad.html',
                        controller: 'BuyKeypadCtrl'
                    }
                }
            })

            .state('app.buy_bitcoin', {
                url: '/buy_bitcoin',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_bitcoin.html',
                        controller: 'BuyBitcoinCtrl'
                    }
                },
                params: {
                    amount: null
                }
            })

            .state('app.buy_airtime', {
                url: '/buy_airtime',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_airtime.html'
                    }
                }
            })

            .state('app.sell_bitcoin', {
                url: '/sell_bitcoin',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/sell_bitcoin.html',
                        controller: 'SellBitcoinCtrl'
                    }
                },
                params: {
                    amount: null
                }
            })

            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/dashboard.html'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/dashboard');
    });
