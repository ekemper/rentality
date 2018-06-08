const rentalController = require('./rentals/rental-controller.js');

class CrawlerController {
	constructor (socketController) {

		this.socketController = socketController;

		this.tenMinutes = 60 * 1000 * 10;
		this.oneMinute = 60000;

		this.crawlInterval = this.oneMinute;

		setInterval(() => {

			rentalController.updateIndex(newRentals => {

				this.socketController.socket.emit('rentalData', {
					data: response
				});
			});

		}, this.crawlInterval);
	}
}

module.exports = CrawlerController;
