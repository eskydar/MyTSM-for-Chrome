$(document).on('ready', function(){
	//Fill the html with the Games and streamers from the config file
	$.each(Games, function(key, gamevalue){
		//Add the table for each game
		$('.table-responsive').append('\
										<table class="table table-hover" id="' + gamevalue.gameKey + '">\
											<thead>\
												<tr>\
													<th class="text-center">\
														' + gamevalue.gameTitle + '\
														<span id="' + gamevalue.gameKey + '" class="collapsable pull-right glyphicon glyphicon-chevron-down" aria-hidden="true"></span></th>\
												</tr>\
											</thead>\
											<tbody class="' + gamevalue.gameKey + '"></tbody>\
										</table>');
		$.each(gamevalue.streams, function(streamkey, streamvalue){
			//Add the streamers to each table for each game
			$('table#'+gamevalue.gameKey+' > tbody').append('\
																	<tr>\
																		<td class="class="text-center"">\
																			<input class="hidden" type="checkbox" class="" id="' + streamkey + '" name="notification-setting" value="' + streamkey + '">\
																			<label for="' + streamkey + '">' + streamkey + '</label>\
																		</td>\
																	</tr>');
		});
	});
	
	//Make the tables collapse, page length issue
	$('.collapsable').on('click', function(){
		id = $(this).attr('id');
		if($('tbody.'+id).is(':hidden')){
			$('tbody.'+id).fadeIn('slow');
			$(this).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
		}
		else{
			$('tbody.'+id).fadeOut('slow');
			$(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
		}
	});

	//Checkbox check event

    $('input[type="checkbox"][name="notification-setting"]').on('change', function(){
    	console.log($(this).val())
    });
});