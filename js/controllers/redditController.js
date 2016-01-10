app.controller('redditController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

	var redditPosts = [];

  	$http.get('http://www.reddit.com/r/TeamSolomid/.rss').
	    success(function(data, status, headers, config) {
	    	$(data).find('item').each(function(k, v) {
	    		//console.log(k, $(v).find('title').html());
	    		var post = {
	    			title: $(v).find('title').html(),
	    			content: $(v).find('description').html(),
	    			link: $(v).find('guid').html(),
	    		}
	    		redditPosts.push(post);
	    	});
	    //console.log($(data).find('guid'));
	    $scope.posts = redditPosts;
	    $scope.game = Games[$stateParams.gameKey];

	    }).
	    error(function(data, status, headers, config) {
	        console.log('Could not get data from reddit, check internet connection or try again later!');
	    });
}]);