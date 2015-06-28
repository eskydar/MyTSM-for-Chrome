/**
 * Lcs manager
 */
function Lcs(){
}

Lcs.prototype.initGeneralStandings = function(){
  $.getJSON( 'http://na.lolesports.com:80/api/standings.json?tournamentId=226', function( data ){
    $.each( data, function( key, value ) {
      // console.log('key: '+ key+ ' value: '+ value.teamTitle);
      $('.standings-list ul').append('\
        <li>\
          <div class="row">\
            <div class="col-xs-8">'+value.teamTitle+'</div>\
            <div class="col-xs-2 colorWin">'+value.wins+'</div>\
            <div class="col-xs-2 colorLoss">'+value.losses+'</div>\
          </div>\
        </li>')
    });
  });
};