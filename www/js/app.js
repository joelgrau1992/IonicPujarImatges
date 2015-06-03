// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })

        .controller('MyCtrl', function ($scope, $timeout, $cordovaFileTransfer, $cordovaCamera) {
            $scope.uploadFile = function () {

                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function (imageURI) {
                    var url = "http://192.168.88.245/servidorimatges/upload.php";
                    var options = {
                        fileKey: "file",
                        fileName: "imatge.jpg",
                        chunkedMode: false,
                        mimeType: "image/jpg"
                    };
                    $cordovaFileTransfer.upload(url, imageURI, options).then(function (result) {
                        console.log("SUCCESS: " + JSON.stringify(result.response));
                        alert("success");
                        alert(JSON.stringify(result.response));
                    }, function (err) {
                        console.log("ERROR: " + JSON.stringify(err));
                        alert(JSON.stringify(err));
                    }, function (progress) {
                        // constant progress updates
                        $timeout(function () {
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                        })
                    });
                }, function (err) {
                    // error
                });
            }
        });