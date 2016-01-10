app.controller('notificationController', ['$scope', function($scope) {
	//Games array to view
	$scope.games = Games;

  var data = {};
  $.each(Games, function (gameKey, gameData) {
    $.each(gameData.streams, function (key, value) {
      chrome.storage.sync.get('tsmnotification['+key+']', function (result) {
        if (!objEmpty(result)) {
          data[key] = result['tsmnotification[' + key + ']'];
        }
      });
    });
  });
  $scope.data = data;

	//Change setting in storage on checkbox change
	$scope.saveNotificationSetting = function(streamer){
		chrome.storage.sync.get('tsmnotification['+streamer+']', function (result) {
			if (!objEmpty(result)) {
        if (result['tsmnotification['+streamer+']']) {
          saveSetting('tsmnotification[' + streamer + ']', false);
        } else {
          saveSetting('tsmnotification[' + streamer + ']', true);
        }
      }
		});
	};

	//Collapse function for table with streamers
	$scope.collapseTable = function(gamekey){
		if($('tbody.'+gamekey).hasClass('hidden')){
			$('tbody.'+gamekey).removeClass('hidden');
		}
		else{
			$('tbody.'+gamekey).addClass('hidden');
		}
	};

  function objEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  function saveSetting(key, value) {
    var data = {};
    data[key] = value;

    chrome.storage.sync.set(data, function() {
      console.info('settings saved');
    });
  }
}]);