var UB = UB || {};

//Browser detection based on :: @is__real
var Browser = {
	Version: function() {
		var version = 999; // we assume a sane browser
		if (navigator.appVersion.indexOf("MSIE") != -1)
		// bah, IE again, lets downgrade version number
		version = parseFloat(navigator.appVersion.split("MSIE")[1]);
		return version;
	}
};
UB.isIE		= /*@cc_on!@*/false && Browser.Version() < 9;
UB.isIE9		= /*@cc_on!@*/false && Browser.Version() == 9;
UB.isIE8		= UB.isIE && !UB.isIE9;
UB.isIOS		= (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod" || navigator.platform == "iPhone Simulator" || navigator.platform == "iPad Simulator");
UB.isIPAD		= (navigator.platform == "iPad" || navigator.platform == "iPad Simulator");
UB.isIPHONE	= (navigator.platform == "iPhone" || navigator.platform == "iPod" || navigator.platform == "iPhone Simulator");
UB.isFF		= navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
UB.isPhone	= navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry)/);

//Utils methods

UB.Utils = {};