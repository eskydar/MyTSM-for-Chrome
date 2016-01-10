var statusManager = streamStatusManager();

var showNotification = function (player) {
    chrome.storage.sync.get('tsmnotification['+player+']', function (result) {
        if (!objEmpty(result)) {
            if (result['tsmnotification['+player+']']) {
                var stamp = new Date().getTime();

                chrome.notifications.create('streamOnline' + player + stamp, {
                    type: 'basic',
                    iconUrl: '../icons/icon128.png',
                    title: 'TSM streamer online',
                    message: player + ' has just started streaming!'
                });
            }
        }
    });
};

chrome.alarms.create('checkStreams', {
    delayInMinutes: 1,
    periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name == 'checkStreams') {
        console.log('Refreshing streams');

        statusManager.refreshStatus(function (statusChange) {
            if (statusChange.newStatus) { // true = online
                showNotification(statusChange.streamKey);
            }
        });
    }
});

//Check storage if streamer value show notifcation is true of false
$.each(Games, function (gameKey, gameData) {
    $.each(gameData.streams, function (key, value) {
        chrome.storage.sync.get('tsmnotification['+key+']', function (result) {
            if (objEmpty(result)) {
                var data = {};
                data['tsmnotification['+key+']'] = true;
                chrome.storage.sync.set(data, function() {
                    console.info('settings saved');
                });
            }
        });
    });
});

function objEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}