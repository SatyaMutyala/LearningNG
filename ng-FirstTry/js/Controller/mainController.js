(function(){

var myApp = angular.module("myApp",[]);

var MainController = function(
    $scope, github, $interval, 
    $log, $location, $anchorScroll){

    var onUserComplete = function(data){
        $scope.user = data;
        github.getRepos($scope.user)
             .then(onRepos, onError);
    }

    var onRepos = function(data){
        $scope.repos = data;
        $location.hash("userDetails");
        $anchorScroll();
    }
    
    var onError = function(reason){
        $scope.error = "Could not fetch data";
    }

    var decrementCountdown= function()
    {
        $scope.countdown -= 1;
        if($scope.countdown < 1)
        {
            $scope.search($scope.username);
        }
    }
    var countdownInterval = null;
    var startCountdown = function()
    {
        countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    }

    $scope.search = function(username){
        $log.info("Searching for user " + username)
        github.getUser(username)
              .then(onUserComplete, onError);

        if(countdownInterval){
            $interval.cancel(countdownInterval);
            $scope.countdown = null;
        }
    }
      
    $scope.message = "Hello Angular!";    
    $scope.username = "Angular";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 5;
    startCountdown();
}
myApp.controller("MainController", MainController);

}());