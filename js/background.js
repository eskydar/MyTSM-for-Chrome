var statusManager = streamStatusManager();

var showNotification = function (player) {
    var stamp = new Date().getTime();

    chrome.notifications.create('streamOnline' + player + stamp, {
        type: 'basic',
        iconUrl: '../icons/icon128.png',
        title: 'TSM streamer online',
        message: player + ' has just started streaming!'
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

