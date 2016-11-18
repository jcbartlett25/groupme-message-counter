angular
      .module('messagesApp')
      .service('messagesService', function($http) {

          return({getGroups: getGroups, getMessages: getMessages});
          
          function getGroups(userToken) {

              var groupsUrl = 'https://api.groupme.com/v3/groups?token=' + userToken;
              var i = 1;
              var params1 = {'per_page': 20, 'page': i};
              var response = {};

              var request = $http({
                  method: 'get',
                  url: groupsUrl,
                  params: params1
              });



              return (request.then(handleSuccess, handleError));
              //console.log(response.$$state.value);

              /*
              while(i < 20){

                response = request.then(handleSuccess, handleError);
                i += 1;
              }*/
          }

          function getMessages(userToken, groupId, before_id) {

            var messagesUrl = 'https://api.groupme.com/v3/groups/'+groupId+'/messages?token=' + userToken;
            var params1 = {'limit': 100}
            if(before_id){
                params1['before_id'] = before_id;
            }

            var request = $http({
                method: 'get',
                url: messagesUrl,
                params: params1
            });

            return (request.then(handleSuccess, handleError));
          }

          function handleError(response) {
              console.log(response);
              return response;
          }

          // The successful response is transformed, unwrapping the application data
          // from the API response payload.
          function handleSuccess( response, status ) {
              console.log(response.data);
              return( response.data );
          }
      });