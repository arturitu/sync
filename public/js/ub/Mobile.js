UB.Mobile = (function () {

	// Private variables
	//var _$mobile;
	var _inicializated = false;

	// Public variables
	var obj				= {};

	// Private methods
	function init () {
		$("#mobile").removeClass("hidden");
		$("#mobile").animate({opacity:1},"slow");

		$("#mobile-synchronized").hide();

		if(!_inicializated){
			_inicializated = true;
			addEventListeners();
		}
	}

	function addEventListeners () {
		$("#form-code").click(onSyncMobile);

		$("#moveUp").on("click",{arg1:"up"},moveIt);
		$("#moveDown").on("click",{arg1:"down"},moveIt);
	}

	function onSyncMobile (e) {
		UB.Sync.syncID = $("#code").val();
		UB.Sync.init();
		return false;
	}

	function connected () {
		$("#mobile-synchronized").show();
		$("#mobile-notSynchronized").hide();
		UB.Sync.sendMessage("newUser","mobile");
	}

	function moveIt(e){
		//console.log(e.data.arg1);
		UB.Sync.sendMessage("move","mobile",e.data.arg1);
	}



	// Public methods
	obj.init	= init;
	obj.connected	= connected;

	return obj;

})();