UB.Desktop = (function () {

	// Private variables
	//var _$name, _name;
	var _inicializated = false;

	// Public variables
	var obj				= {};

	// Private methods
	function init () {
		$("#desktop").removeClass("hidden");
		$("#desktop").animate({opacity:1},"slow");

		$("#desktop-synchronized").hide();

		UB.Sync.syncID = makeid();
		$("#syncID").text (UB.Sync.syncID);

		if(!_inicializated){	
			_inicializated = true;
			addEventListeners();
		}
	}


	function makeid()
	{
	    var text = "";
	    var possible = "abcdefghijklmnopqrstuvwxyz";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	function addEventListeners () {
		$("#syncDesktop").on("click",onSyncDesktop);
	}

	function onSyncDesktop (e) {
		UB.Sync.init();
		return false;
	}

	function connected () {
		$("#desktop-synchronized").show();
		$("#desktop-notSynchronized").hide();
		UB.Sync.sendMessage("newUser","desktop");
	}

	// Public methods
	obj.init	= init;
	obj.connected	= connected;

	return obj;

})();