/*global Firebase, console, angular, cordova */
angular.module('air.services', [])

    .service('Timer', function (API, $rootScope, $ionicPopup) {
        'use strict';
        var time;
        var self = this;
        var timerId;

        self.initializeClock = function (id, startTime, endTime) {
            var clock = document.getElementById(id);
            console.log(clock)
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');
            time = startTime;

            function updateClock() {
                time = time + 1000;

                var t = self.getTimeRemaining(endTime);

                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);


                if (t.total <= 0) {
                    clearInterval($rootScope.timeinterval);
                    self.popupTimeout()
                }
            }

            updateClock();
            timerId = setInterval(updateClock, 1000);
        };

        self.getTimeRemaining = function (endtime, label) {
            var t = Date.parse(endtime) - time;
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            return {
                'total': t,
                'minutes': minutes,
                'seconds': seconds
            };
        };

        self.popupTimeout = function () {
            $ionicPopup.alert({
                title: 'Timeout',
                template: '<h1 class="title text-center">You took too long</h1>' +
                '<img src="images/notime.png" style="width:150px; display:block; margin:auto;">' +
                '<h2 class="title text-center">Please try again</h2>'
            });
        };

    })

    .service('QR Scanner', function (API, $rootScope, $ionicPopup) {
        'use strict';
        var self = this;

        self.scanBarcode = function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    return {
                        'address': self.parseUri(result.text).host,
                        'amount': self.parseUri(result.text).queryKey.amount
                    };

                },
                function (error) {
                    alert("Scanning failed: " + error);
                })
        };

        self.parseUri = function (str) {
            var o = parseUri.options,
                m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                uri = {},
                i = 14;

            while (i--) uri[o.key[i]] = m[i] || "";

            uri[o.q.name] = {};
            uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
                if ($1) uri[o.q.name][$1] = $2;
            });

            return uri;
        };

        self.parseUri.options = {
            strictMode: false,
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            q: {
                name: "queryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        }
    });
