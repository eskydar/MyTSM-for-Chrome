/**
 * Reddit manager
 */
function Reddit(){
}

Reddit.prototype.initGeneralSettings = function(){
  $.get("http://www.reddit.com/r/TeamSolomid/.rss", function (data) {
    $(data).find("item").each(function () {
        var el = $(this);
        $('.reddit-list ul').append('\
          <li>\
            <div class="row">\
              <div class="col-xs-12">\
                <a class="newTab" href="'+ el.find("link").text() +'">'+el.find("title").text()+'</a>\
              </div>\
            </div>\
          </li>');
    });
  });
};