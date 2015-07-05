var streamStatusManager = function () {
    var streamStatusManager = {};
    var streamStatus = {};

    streamStatusManager.refreshStatus = function (callback) {
        callback = callback || $.noop;

        $.each(Games, function (gameKey, gameData) {
            $.each(gameData.streams, function (key, value) {
                $.getJSON('https://api.twitch.tv/kraken/streams/' + value, function (data) {
                    var newStatus = (data.stream != null);

                    console.log('Streamer: ' + value + ' = ' + newStatus + ' (was: ' + streamStatus[key] + ')');

                    if (newStatus != streamStatus[key]) {
                        console.log('+ changed');

                        callback({
                            gameKey: gameKey,
                            streamKey: key,
                            oldStatus: streamStatus[key],
                            newStatus: newStatus
                        });
                    }

                    streamStatus[key] = newStatus;
                });
            });
        });
    };

    streamStatusManager.getStatus = function(streamKey) {
        return streamStatus[streamKey];
    };

    return streamStatusManager;
};