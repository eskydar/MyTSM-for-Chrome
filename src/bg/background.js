// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });
var Dyrus = 'offline';
var Santorin = 'offline';
var Bjergsen = 'offline';
var WildTurtle = 'offline';
var Lustboy = 'offline';
var Trump = 'offline';
var Kripparrian = 'offline';
var Xyp9x = 'offline';
var cajunb = 'offline';
var device = 'offline';
var dupreeh = 'offline';
var Karrigan = 'offline';
var Divios = 'offline';
var DaGarz = 'offline';
var TheBoosh = 'offline';
var Snoopy = 'offline';
var Eonic = 'offline';
var Leffen = 'offline';
var Locodoco = 'offline';
var Reginald = 'offline';
var TheOddOne = 'offline';

var oStreamManager = new Stream();
chrome.alarms.create('checkStreams2', {delayInMinutes: 0.1, periodInMinutes: 0.2} );
chrome.alarms.onAlarm.addListener(function(alarm) {
	if(alarm.name == 'checkStreams2')
	{
		oStreamManager.getStreamStatus(jsonstreams, false, true, true, 'lol');
		oStreamManager.getStreamStatus(jsonstreams, false, true, true, 'cs');
		oStreamManager.getStreamStatus(jsonstreams, false, true, true, 'hs');
		oStreamManager.getStreamStatus(jsonstreams, false, true, true, 'smite');
		oStreamManager.getStreamStatus(jsonstreams, false, true, true, 'smash');
		oStreamManager.getStreamStatus(jsonstreams, false, true, true, 'other');
	}
});