angular.module('air.controllers', [])


    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
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
            $state.go('app.sell_bitcoin_provide_email', {
                amount: amount
            });
        };
    })


    .controller('SellBitcoinProvideEmailCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('buy bitcoin provide email controller');
        $scope.data = {};
        $scope.sellAmount = $stateParams.amount;
        console.log($scope.sellAmount);
        console.log($scope.data.email);

        $scope.submit = function (amount, email) {
            console.log(amount);
            console.log(email);
            $state.go('app.sell_bitcoin', {
                amount: amount,
                email: $scope.data.email
            });
        };
    })


    .controller('SellBitcoinCtrl', function ($scope, $rootScope, $stateParams, $window, $state, Transaction, Timer, $ionicLoading) {
        'use strict';
        var sellAmount = $stateParams.amount;
        console.log(sellAmount);

        $scope.email = $stateParams.email;
        console.log($scope.email);

        if (sellAmount == undefined) {
            $state.go('app.sell_btc_keypad')
        }

        var qrDetails = Transaction.create('load_bitcoin', sellAmount, 'ZAR');
        var intervalId;

        $ionicLoading.show({
            //template: '<ion-spinner class="spinner-light" icon="ripple"></ion-spinner>',
            templateUrl: 'templates/loading.html',
            hideOnStateChange: true
        });

        qrDetails.then(function (rawData) {
            $scope.tx_data = rawData.data;

            // Pre-load image in js:
            var qrImageLoad = new Image(300, 300);
            qrImageLoad.src = $scope.tx_data.meta.qr_code;
            var qrImage = document.getElementById("qr_code");

            qrImageLoad.onload = function () {
                qrImage.src = this.src;
                $ionicLoading.hide()
            };

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
                        $state.go('sell_bitcoin_success', {
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


    .controller('SellBitcoinSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.amount = $stateParams.amount;
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
            $state.go('app.buy_bitcoin_provide_email', {
                amount: amount
            });
        };

    })


    .controller('BuyBitcoinProvideEmailCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('buy bitcoin provide email controller');
        $scope.data = {};
        $scope.buyAmount = $stateParams.amount;
        console.log($scope.buyAmount);
        console.log($scope.data.email);

        $scope.submit = function (amount, email) {
            console.log(amount);
            console.log(email);
            $state.go('app.buy_bitcoin', {
                amount: amount,
                email: $scope.data.email
            });
        };
    })


    .controller('BuyBitcoinCtrl', function ($state, $scope, $stateParams) {
        'use strict';
        console.log('buy controller');
        $scope.buyAmount = $stateParams.amount;
        $scope.email = $stateParams.email;
        $scope.address = $stateParams.address;
        console.log($scope.buyAmount);
        console.log($scope.email);
        console.log($scope.address);

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

        $scope.submit = function (amount, email, address) {
            console.log('go to buy confirm page')
            console.log(amount);
            console.log(email);
            console.log(address);
            $state.go('app.buy_bitcoin_confirm', {
                amount: amount,
                email: email,
                address: address
            });
        };
    })


    .controller('BuyBitcoinConfirmCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('confirm bitcoin purchase');
        $scope.data = {};
        $scope.buyAmount = $stateParams.amount;
        $scope.email = $stateParams.email;
        $scope.address = $stateParams.address;
        console.log($scope.buyAmount);
        console.log($scope.email);
        console.log($scope.address);

        $scope.submit = function (amount, email) {
            console.log(amount);
            console.log(email);
            $state.go('app.buy_bitcoin_success', {
                amount: amount,
                email: email
            });
        };
    })


    .controller('BuyBitcoinSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('confirm bitcoin purchase');
        $scope.data = {};
        $scope.buyAmount = $stateParams.amount;
        $scope.email = $stateParams.email;
        $scope.address = $stateParams.address;
        console.log($scope.buyAmount);
        console.log($scope.email);
        console.log($scope.address);
    })


    .controller('BuyAirtimeCtrl', function ($scope, $state, Bitrefill) {
        'use strict';
        $scope.data = {};
        console.log($scope.data.number);
        $scope.lookup_number = function (number) {
            var lookup = Bitrefill.lookup_number(number);
            lookup.then(function (rawData) {
                var airtimeData = rawData.data;
                console.log(rawData);
                $state.go('app.buy_airtime_operator', {
                    airtimeData: airtimeData,
                    number: $scope.data.number
                });
            })
        }
    })


    .controller('BuyAirtimeOperatorCtrl', function ($scope, $state, Bitrefill, $stateParams) {
        'use strict';
        if ($stateParams.airtimeData == null) {
            $state.go('app.buy_airtime');
        } else {
            var operatorList = $stateParams.airtimeData.altOperators;
            operatorList.push($stateParams.airtimeData.operator);
            console.log(operatorList);

            $scope.data = {
                airtime: $stateParams.airtimeData,
                operatorList: operatorList,
                currency: $stateParams.airtimeData.country.currencies[0],
                defaultSelected: {
                    operator: $stateParams.airtimeData.operator.slug,
                    package: $stateParams.airtimeData.operator.packages[0].value
                }
            };
            console.log('hello');
            console.log($scope.data);
        }
        $scope.confirm = function () {
            var number = $stateParams.number;
            var email = $stateParams.email;
            var operator_slug = $scope.data.operator_slug;
            var value_package = $scope.data.value_package;

            var getQuote = Bitrefill.quote(number,
                operator_slug,
                email,
                value_package);

            getQuote.then(function (response) {
                    var quote = response.data
                    console.log(quote)
                    $state.go('app.buy_airtime_success', {
                        number: number,
                        operator_slug: operator_slug,
                        package: value_package,
                        quote: quote
                    });
                }
            );
        }
    })

    .controller('BuyAirtimeConfirmCtrl', function ($scope, $state, Bitrefill, $stateParams) {
        'use strict';

    });
