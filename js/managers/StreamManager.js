/**
 * Stream manager
 */
function Stream(){
}

Stream.prototype.initGeneralSettings = function(streamListJson){
  $.each( streamListJson.lol.streams, function( key, value ) {

    $('.stream-list ul').append('\
      <li>\
        <div class="row">\
          <div class="col-xs-8 player">\
            <a class="newTab" href="http://www.twitch.tv/'+value+'">'+key+'</a>\
          </div>\
          <div class="col-xs-4 status">\
            <span class="glyphicon glyphicon-dot" id="'+ value +'" aria-hidden="true"></span>\
          </div>\
        </div>\
      </li>')

  });
};

Stream.prototype.getStreamStatus = function(streamListJson, status, notifications){
  
  $.each( streamListJson.lol.streams, function( key, value ) {
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
      if(data.stream != null)
      {
        if(notifications)
        {
          var oStreamManager = new Stream();
          oStreamManager.showNotification(key, value);
          console.log('jaja');
        }
      }
    });

  });

  Stream.prototype.showNotification = function(player, url){
    chrome.notifications.create('streamOnline'+player, {
    type: 'basic',
    iconUrl: 'icon128.png',
    title: 'TSM streamer online',
    message: player+' has just started streaming!'
    }, function(notificationId) {});
  }

};