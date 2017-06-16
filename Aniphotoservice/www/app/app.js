(function () {
    "use strict";

    angular.module("myapp", ["ionic", "ngCordova", "myapp.controllers", "myapp.services", "ion-gallery"])
        .run(function ($rootScope, $ionicPlatform) {
            $rootScope.appReady = { status: false };
            $ionicPlatform.ready(function () {
                console.log('ionic Ready');
                $rootScope.appReady.status = true;
                $rootScope.$apply();
                console.log('in app.js, appReady is ' + $rootScope.appReady.status);
                var st = location.href.split("#")[1];
                console.log(st)
                if (st == "/app/home") {
                    console.log("mta")
                    $ionicPlatform.registerBackButtonAction(function (event) {
                        console.log("lala")
                        dataStorage.exitGame = true;
                        $scope.$apply();
                    }, 100);
                } else {
                    console.log("ba")
                }

                $ionicPlatform.registerBackButtonAction(function (event) {
                    console.log("push back button ");
                    event.preventDefault();
                }, 100);
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                /*if (window.StatusBar) {
                    StatusBar.styleDefault();
                }*/
                if (window.StatusBar) {
                    StatusBar.hide();
                }
            });
            
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "app/templates/view-menu.html",
                controller: "appCtrl"
            })
            .state("app.home", {
                url: "/home",
                templateUrl: "app/templates/view-home.html",
                controller: "homeCtrl"
            })
            .state("app.galleryPage", {
                url: "/galleryPage",
                templateUrl: "app/templates/galleryPage.html",
                controller: "galleryPageCtrl"
            })
            .state("app.infoPayment", {
                url: "/infoPayment",
                templateUrl: "app/templates/infoPhotoPayment.html",
                controller: "infoPaymentCtrl"
            })
            .state("app.address", {
                url: "/address",
                templateUrl: "app/templates/address.html",
                controller: "addressCtrl",
                controllerAs:"addressC"
            })
            .state("app.payment", {
                url: "/payment",
                templateUrl: "app/templates/payment.html",
                controller: "paymentCtrl"
            });
            $urlRouterProvider.otherwise("/app/home");
        })
        .config(function (ionGalleryConfigProvider) {
            ionGalleryConfigProvider.setGalleryConfig({
                action_label: 'Close',
                toggle: false,
                row_size: 3,
                fixed_row_size: true,
                zoom_events: false
            });
        })
      /*  .config(function ($cordovaFacebookProvider) {
            ionic.Platform.ready(function () {
                if (!window.cordova || window.cordova && window.cordova.platformId === 'browser') {
                    $cordovaFacebookProvider.browserInit('1035688406566191', 'v2.0');
                }
            });
        })*/
})();