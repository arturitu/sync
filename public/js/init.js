(function init() {

	UB.Preload.init(function (){
		if (UB.isPhone) {
			UB.Mobile.init();
		} else {
			UB.Desktop.init();
		}
	});

})();