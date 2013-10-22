// -----
// Preload
// -----
// Main site preload based on an: @is__real code


UB.Preload = (function () {
	
	// Private variables
	var _callback;

	// Public variables
	var obj					= {};

	// Private methods
	
	function init (callback) {
		_callback = callback;

		$("#preload").css("display","block");

		setTimeout(preloadEnd,1000);

		positionPreload();	
		addEventListeners();
	}
	
	function positionPreload (w, h) {
		
		w = w || window.innerWidth;
		h = h || window.innerHeight;
		$("#preload").css("left",((w - 32 ) / 2) + "px");
		$("#preload").css("top",((h - 32 ) / 2) + "px");
	}
	
	function addEventListeners () {		
		window.addEventListener('resize', onWindowResize, false);
	}
	
	function preloadEnd () {
		$("#preload").css("opacity",0);
		$("#preload").animate({opacity:1},"slow",function() {
  				$("#preload").css("display","none");
 		 });
		if (_callback) _callback();
	}

	function onWindowResize (e) {

		var w = window.innerWidth,
			h = window.innerHeight;
		positionPreload(w, h);
	}
	
	// Public methods
	obj.init = init;
	
	return obj;
	
})();

