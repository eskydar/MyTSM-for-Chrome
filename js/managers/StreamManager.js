/**
 * Stream manager
 */
function Stream(){
}

var background = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js
background.transfer;

Stream.prototype.initGeneralSettings = function(streamListJson, game){
  $.each( streamListJson[game].streams, function( key, value ) {

    $('.stream-list#'+game+' ul').append('\
      <li>\
        <div class="row">\
          <div class="col-xs-8 player">\
            <a class="newTab" href="http://www.twitch.tv/'+value+'">'+key+'</a>\
          </div>\
          <div class="col-xs-4 status">\
            <span class="glyphicon glyphicon-dot" id="'+ value +'" aria-hidden="true"></span>\
          </div>\
        </div>\
      </li>');
  });
};

Stream.prototype.getStreamStatus = function(streamListJson, status, notifications, prefix, game){
  
  $.each( streamListJson[game].streams, function( key, value ) {
    $.getJSON( 'https://api.twitch.tv/kraken/streams/'+value, function( data ){
      if(status)
      {
        if(data.stream == null)
        {
          $('#'+value).css('color', 'red');
        }
        else
        {
          $('#'+value).css('color', 'green');
        }
      }
      if(notifications)
      {
        if(data.stream != null)
        {
          if(background[key] == "offline")
          {
            
            var oStreamManager = new Stream();
            oStreamManager.showNotification(key, value, prefix);
            background[key] = "online";
          }
        }
        else
        {
          background[key] = "offline";
        }
      }

    });
    console.log(background[key]);
  });

  Stream.prototype.showNotification = function(player, url, prefix){
    var icon = 'icon128.png';
    if(prefix)
    {
      icon = 'icons/icon128.png';
    }
    var stamp = new Date().getTime();
    chrome.notifications.create('streamOnline'+player+stamp, {
    type: 'basic',
    iconUrl: icon,
    title: 'TSM streamer online',
    message: player+' has just started streaming!'
    }, function(notificationId) {});
  }
};