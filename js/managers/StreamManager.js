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

Stream.prototype.getStreamStatus = function(streamListJson){
  
  $.each( streamListJson.lol.streams, function( key, value ) {
    $.getJSON( 'https://api.twitch.tv/kraken/streams/'+value, function( data ){
      if(data.stream == null)
      {
        $('#'+value).addClass('offline');
      }
      else
      {
        $('#'+value).addClass('online');
      }
    });

  });

};