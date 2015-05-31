$(document).on('ready', function(){
	//button click
	$('.slidePage').on('click', function(){
		//put the target page in target variable
		var target = $(this).attr('data-page');

		//Current active page, add class back for backbutton, remove active class and animate with callback
		$('section.active').addClass('back').removeClass('active').slideUp('slow', function(){
			//Target page, animate is, add class active and remove the hidden class
			$('.'+target).slideDown('slow').addClass('active').removeClass('hidden');
		});

		//check if there is a element with back class
		if( $('section.back').length )
		{
			//True then show back-button
			$('.back-button').show();
		}
	});

	//backbutton click
	$('.back-button').on('click', function(){
		//Current active page, remove class active, animate with callback
		$('section.active').removeClass('active').slideUp('slow', function(){
			//The back target page, remove back class, add active class and animate
			$('section.back').removeClass('back').addClass('active').slideDown('slow');
		});

		//Hide the back button
		$('.back-button').hide();
	});


	var streams = ['tsm_dyrus', 'TSM_Santorin', 'TSM_Bjergsen', 'TSM_WildTurtle', 'TSM_Lustboy'];

	$.each( streams, function( key, value ) {
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

	$('.newTab').on('click', function(){
		var newURL = $(this).attr('href');
    chrome.tabs.create({ url: newURL });
	});
});