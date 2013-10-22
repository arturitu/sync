UB.Sync = (function () {

	// Private variables
	var _socket;			// Socket connection		

	// Public variables
	var obj				= {};
	obj.syncID;					// unique ID
	//obj.filter	= "all";

	// Private methods
	/**************************************************
	** INITIALISATION
	**************************************************/
	function init() {
		if (typeof io === "undefined") {
			alert("Multiuser server is Offline. Try it later!");
		}else{
			// Initialise socket connection
			_socket = io.connect("http://192.168.1.34", {port: 3000});
			// Start listening for events
			setEventHandlers();
		}
	
	};


	/**************************************************
	** EVENT HANDLERS
	**************************************************/
	var setEventHandlers = function() {

		// Socket connection successful
		_socket.on("connect", onSocketConnected);

		// Socket disconnection
		_socket.on("disconnect", onSocketDisconnect);

		// New player message received
		_socket.on("game." + obj.syncID, onSocketReceived);

	};


	// Socket connected
	function onSocketConnected() {
		console.log("Connected to socket server");
		// Send local player data to the game server
		_socket.emit('psubscribe', 'game.' + obj.syncID);
		
		if (UB.isPhone) {
			UB.Mobile.connected();
		} else {
			UB.Desktop.connected();
		}

	};

	// Socket disconnected
	function onSocketDisconnect() {
		console.log("Disconnected from socket server");
	};

	// New message
	function onSocketReceived(message) {
	          data = jQuery.parseJSON(message.data);
	          console.log("....",message);
	};


	/**************************************************
	** EMIT MESSAGES
	**************************************************/

	function sendMessage(type,param1,param2){
			switch  (type) {
				case "newUser":
					_socket.emit('join', 'game.' + obj.syncID ,
	        		JSON.stringify({user: param1, msg: Date.now() }));
	        	break;
	        	case "move":
	        		_socket.emit('publish', 'game.' + obj.syncID , 
	        	   JSON.stringify({ user: param1, msg: Date.now() }));
	        	break;
			}
	}

	// Public methods
	obj.init	= init;
	obj.sendMessage	= sendMessage;

	return obj;

})();






