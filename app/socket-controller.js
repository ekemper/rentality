'use-strict';

const rentalController = require('./rentals/rental-controller.js');

class SocketController {

	constructor (socketioInstance) {
		this.io = socketioInstance;

		this.socket;

		this.io.on('connection', this.onConnect)
	}

	onConnect (socket) {

		this.socket = socket;

		console.log('on connect, socket.id', socket.id);

		//this.registerListeners();

		rentalController.getAllRentals( response => {
			socket.emit('rentalData', {
				data: response
			});
		});


	}

	// registerListeners () {

	// 	socket.on('request data', (payload) => {
	// 		console.log(payload);
	// 	});
	// }

}

module.exports = SocketController;
