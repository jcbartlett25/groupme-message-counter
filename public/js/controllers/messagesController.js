angular
      .module('messagesApp', [])
      .controller('messagesController', function($scope, $q, messagesService){

          // Global variables available to the DOM
          $scope.results = [];
          $scope.loading = false;
          $scope.done = false;
          $scope.current = {};
          $scope.messageCounter = {};
          var initial = {};

          var testingUrl = "https://groupme-message-counter.herokuapp.com/app?access_token=194475d08eb80134cfe84b85946f1669";
          var url = window.location.href;
          var ACCESS_TOKEN = url.split("=")[1];

          $scope.getGroups = function(){

            messagesService.getGroups(ACCESS_TOKEN).then(function(data){

                if(data){

                    data.response.forEach(function(group) {

                        $scope.results.push(group)
                    });
                }
            });

          }

          $scope.getMessage = function(group_id, groupName, groupPic){

            $scope.loading = true;
            $scope.groupName = groupName;
            $scope.groupPic = groupPic;

            $scope.getMessages(group_id).then(function(){
                $scope.loading = false;
                $scope.done = true;
            });
          }

          $scope.getMessages = function(group_id){

            

            messagesService.getMessages(ACCESS_TOKEN, group_id).then(function(data){

                if(data){

                    var lastMessage = lastMessage;

                    if(data.response){

                        data.response.messages.forEach(function(message) {

                            //console.log(message);
                            lastMessage = message;

                            if(message.sender_type == "user"){

                                if($scope.messageCounter[message.sender_id])
                                    $scope.messageCounter[message.sender_id].count++;
                                else{
                                    $scope.messageCounter[message.sender_id] = {'count':1,'name':message.name};
                                }
                            }
                        });

                        $scope.getMessages(group_id, lastMessage.id);
                    }

                    else{
                        $scope.loading = false;
                        $scope.done = true;
                        return $q;
                        //console.log('done');
                    }
                }
            });
          }

          function hideGroups(){
            $('#search_results').fadeOut();
          }

          $scope.getMessages = function(group_id, lastMessage){

            messagesService.getMessages(ACCESS_TOKEN, group_id, lastMessage).then(function(data){

                if(data){

                    var lastMessage = {};

                    if(data.response){

                        data.response.messages.forEach(function(message) {

                            //console.log(message);
                            lastMessage = message;

                            if(message.sender_type == "user"){

                                if($scope.messageCounter[message.sender_id])
                                    $scope.messageCounter[message.sender_id].count++;
                                else{
                                    $scope.messageCounter[message.sender_id] = {'count':1,'name':message.name};
                                }
                            }
                        });

                        

                        $scope.getMessages(group_id, lastMessage.id);
                    }

                    else{
                        $scope.loading = false;
                        $scope.done = true;
                        console.log('done');
                        console.log($scope.messageCounter);
                        return $q;
                    }
                }
            });

            //$('#search_results').fadeIn();
          }

          $scope.test = function(group_id){
            console.log(group_id);
          }

          $scope.reset = function () {
            angular.copy(initial, $scope.messageCounter);
          };

          $scope.getGroups();

      });