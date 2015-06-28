$(document).on('ready', function(){

	var history = [];

  page.base('/basic');
  page('/back', backButton);
  page('/:target/:target2?', getPage);
  page();

  function getPage(ctx) {

    history.push($('section.active').attr('id'));
    $('section').not('.hidden').slideUp('slow', function(){
    	$('section').addClass('hidden').removeClass('active');
      if(ctx.params.target2)
    	{
    		$('section#'+ctx.params.target + ctx.params.target2).addClass('active').removeClass('hidden').hide().slideDown('slow');
    	}
    	else
    	{
    		$('section#'+ctx.params.target).addClass('active').removeClass('hidden').hide().slideDown('slow');
    	}

    	if(history.length)
  		{
  			$('.back-button').show();
  			if($('section.active').is('#main'))
  			{
  				$('.back-button').hide();
  				history = [];
  			}
  		}
    });
  }

  function backButton() {
  	page.redirect('/'+$(history).get(-1));
    history.splice(-1,1);
  }

	var oStreamManager = new Stream();
  oStreamManager.initGeneralSettings(jsonstreams, 'lol');
  oStreamManager.initGeneralSettings(jsonstreams, 'cs');
  oStreamManager.initGeneralSettings(jsonstreams, 'hs');
  oStreamManager.initGeneralSettings(jsonstreams, 'smite');
  oStreamManager.initGeneralSettings(jsonstreams, 'smash');
	oStreamManager.initGeneralSettings(jsonstreams, 'other');
  oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'lol');
  oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'cs');
  oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'hs');
  oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'smite');
  oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'smash');
	oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'other');
	//Create Alarm
	chrome.alarms.create('checkStreams', {delayInMinutes: 0.1, periodInMinutes: 0.2} );
	//Create Listener for previously created alarm
	chrome.alarms.onAlarm.addListener(function(alarm) {
		if(alarm.name == 'checkStreams')
		{
      oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'lol');
      oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'cs');
      oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'hs');
      oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'smite');
      oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'smash');
			oStreamManager.getStreamStatus(jsonstreams, true, true, false, 'other');
		}
	});

	//Load Reddit data on popup open
	var oRedditManager = new Reddit();
	oRedditManager.initGeneralSettings();

	//Load Standings data on popup open
	var oLcsManager = new Lcs();
	oLcsManager.initGeneralStandings();

	window.addEventListener('click',function(e){
	  if($(e.target).hasClass('newTab'))
	  {
	  	chrome.tabs.create({url:e.target.href})
	  }
	})

});