angular.module('air.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    })

    .controller('SellBitcoinCtrl', function ($scope, $rootScope, $stateParams, $window, $state, Transaction, Timer) {
        'use strict';
        var sellAmount = $stateParams.amount;
        console.log(sellAmount);

        if (sellAmount == undefined) {
            $state.go('app.sell_btc_keypad')
        }

        var qrDetails = Transaction.create('load_bitcoin', sellAmount, 'ZAR');
        var intervalId;

        qrDetails.then(function (rawData) {
            $scope.tx_data = rawData.data;
            console.log($scope.tx_data);
            var sellBtcExpiry = new Date($scope.tx_data.meta.expiry_timestamp);
            var sellBtcStart = Date.parse($scope.tx_data.created_timestamp);
            Timer.initializeClock('clockdiv', sellBtcStart, sellBtcExpiry);
            intervalId = setInterval(pollSellTx, 2500);
        });

        function pollSellTx() {
            console.log('Tx Poll');
            console.log($scope.tx_data.transaction_code);
            var getTx = Transaction.get($scope.tx_data.transaction_code);
            getTx.then(
                function (rawData) {
                    var tx = rawData.data.results;
                    console.log(tx.status);
                    console.log(tx);

                    if (tx.status == 'Complete') {
                        console.log('complete');
                        $window.localStorage.removeItem('myTransactions');
                        clearInterval(intervalId);
                        $state.go('sell_success', {
                            amount: tx.amount
                        });
                    }
                }
            )
        }

        $scope.$on('$ionicView.afterLeave', function () { // $scope.$on('$destroy'
            console.log('LEAVE');
            clearInterval(intervalId);
            Timer.stopTimer();
        });
    })

    .controller('BuyBitcoinCtrl', function ($scope, $stateParams) {
        'use strict';
        console.log('buy controller');
        $scope.buyAmount = $stateParams.amount;
        console.log($scope.buyAmount);

        $scope.scanQr = function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }


    })

    .controller('SellKeypadCtrl', function ($scope, $state) {
        'use strict';

        $scope.viewTitle = 'Sell bitcoin';
        $scope.keypadVar = '';
        $scope.action = 'Sell';

        $scope.keyPress = function (value, source) {
            if (source === 'LEFT_CONTROL') {
                if ($scope.keypadVar.indexOf('.') === -1) {
                    if ($scope.keypadVar.length === 0)
                        $scope.keypadVar += '0.';
                    else
                        $scope.keypadVar += '.';
                }
                console.log($scope.keypadVar.length)
            }
            else if (source === 'RIGHT_CONTROL') {
                $scope.keypadVar = $scope.keypadVar.substr(0, $scope.keypadVar.length - 1);
                console.log($scope.keypadVar.length)
            }
            else if (source === 'NUMERIC_KEY') {
                if ($scope.keypadVar.indexOf('.') === -1) {
                    $scope.keypadVar += value;
                } else if ($scope.keypadVar.length - $scope.keypadVar.indexOf('.') <= 2) {
                    $scope.keypadVar += value;
                }
                console.log($scope.keypadVar.length)

            }
        };

        $scope.submit = function (amount) {
            console.log(amount);
            $state.go('app.sell_bitcoin', {
                amount: amount
            });
        };

    })

    .controller('BuyKeypadCtrl', function ($scope, $state) {
        'use strict';

        $scope.viewTitle = 'Buy bitcoin';
        $scope.keypadVar = '';
        $scope.action = 'Next';

        $scope.keyPress = function (value, source) {
            if (source === 'LEFT_CONTROL') {
                if ($scope.keypadVar.indexOf('.') === -1) {
                    if ($scope.keypadVar.length === 0)
                        $scope.keypadVar += '0.';
                    else
                        $scope.keypadVar += '.';
                }
                console.log($scope.keypadVar.length)
            }
            else if (source === 'RIGHT_CONTROL') {
                $scope.keypadVar = $scope.keypadVar.substr(0, $scope.keypadVar.length - 1);
                console.log($scope.keypadVar.length)
            }
            else if (source === 'NUMERIC_KEY') {
                if ($scope.keypadVar.indexOf('.') === -1) {
                    $scope.keypadVar += value;
                } else if ($scope.keypadVar.length - $scope.keypadVar.indexOf('.') <= 2) {
                    $scope.keypadVar += value;
                }
                console.log($scope.keypadVar.length)

            }
        };

        $scope.submit = function (amount) {
            console.log(amount);
            $state.go('app.buy_bitcoin', {
                amount: amount
            });
        };

    });
