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
                StatusBar.overlaysWebView(true);
                StatusBar.show();
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

            .state('loading', {
                url: '/loading',
                templateUrl: 'templates/loading.html',
                params: {
                    amount: null
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

            .state('app.buy_bitcoin_provide_email', {
                url: '/buy_bitcoin_provide_email',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_bitcoin_provide_email.html',
                        controller: 'BuyBitcoinProvideEmailCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null
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
                    amount: null,
                    email: null,
                    address: null
                }
            })

            .state('app.buy_bitcoin_manual', {
                url: '/buy_bitcoin_manual',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_bitcoin_manual.html',
                        controller: 'BuyBitcoinManualCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null,
                    address: null
                }
            })

            .state('app.buy_bitcoin_confirm', {
                url: '/buy_bitcoin_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_bitcoin_confirm.html',
                        controller: 'BuyBitcoinConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null,
                    address: null,
                    quote_reference: null
                }
            })

            .state('app.buy_bitcoin_success', {
                url: '/buy_bitcoin_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_bitcoin_success.html',
                        controller: 'BuyBitcoinSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null,
                    address: null
                }
            })

            .state('sell_keypad', {
                url: '/sell_keypad',
                templateUrl: 'templates/keypad.html',
                controller: 'SellKeypadCtrl'
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

            .state('app.sell_bitcoin_provide_email', {
                url: '/sell_bitcoin_provide_email',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/sell_bitcoin_provide_email.html',
                        controller: 'SellBitcoinProvideEmailCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null
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

            .state('sell_bitcoin_success', {
                url: '/sell_bitcoin_success',
                templateUrl: 'templates/sell_bitcoin_success.html',
                params: {
                    amount: null,
                    controller: 'SellBitcoinSuccessCtrl'
                }
            })

            .state('app.buy_air_keypad', {
                url: '/buy_air_keypad',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/keypad.html',
                        controller: 'BuyAirKeypadCtrl'
                    }
                }
            })

            .state('app.buy_air_provide_email', {
                url: '/buy_air_provide_email',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_air_provide_email.html',
                        controller: 'BuyAirProvideEmailCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null
                }
            })

            .state('app.buy_air_confirm', {
                url: '/buy_air_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_air_confirm.html',
                        controller: 'BuyAirConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null
                }
            })

            .state('app.buy_air_success', {
                url: '/buy_air_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_air_success.html',
                        controller: 'BuyAirSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null
                }
            })

            .state('app.sell_air_keypad', {
                url: '/sell_air_keypad',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/keypad.html',
                        controller: 'SellKeypadCtrl'
                    }
                }
            })

            .state('app.sell_air_provide_email', {
                url: '/sell_air_provide_email',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/sell_air_provide_email.html',
                        controller: 'SellAirProvideEmailCtrl'
                    }
                },
                params: {
                    amount: null,
                    email: null
                }
            })

            .state('app.sell_air', {
                url: '/sell_air',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/sell_air.html',
                        controller: 'SellAirCtrl'
                    }
                },
                params: {
                    amount: null
                }
            })

            .state('sell_air_success', {
                url: '/sell_air_success',
                templateUrl: 'templates/sell_air_success.html',
                params: {
                    amount: null,
                    controller: 'SellAirSuccessCtrl'
                }
            })

            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/dashboard.html'
                    }
                }
            })

            .state('app.buy_airtime', {
                url: '/buy_airtime',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_airtime.html',
                        controller: 'BuyAirtimeCtrl'
                    }
                }
            })

            .state('app.buy_airtime_operator', {
                url: '/buy_airtime_operator',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_airtime_operator.html',
                        controller: 'BuyAirtimeOperatorCtrl'
                    }
                },
                params: {
                    airtimeData: null,
                    number: null,
                    email: 'info@zapgo.co'
                }
            })

            .state('app.buy_airtime_confirm', {
                url: '/buy_airtime_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/buy_airtime_confirm.html',
                        controller: 'BuyAirtimeConfirmCtrl'
                    }
                },
                params: {
                    quote: null,
                    valuePackage: null,
                    packageCurrency: null,
                    number: null,
                    email: 'info@zapgo.co',
                    operatorSlug: null,
                    operatorName: null
                }
            })

            .state('app.accounts', {
                url: '/accounts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/accounts.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/dashboard');
    });
