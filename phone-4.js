(function(exports){
	"use strict";

	// APP SHOULD BUY PHONES UNTIL NOT ENOUGH MONEY IS LEFT TO BUY 
	// ANOTHER ONE AND STILL HAVE 'THRESHOLD' $ LEFT
	// THEN APP BUYS ACCESSORIES UNTIL SAME CONDITION
	// THEN APP OUTPUTS HOW MANY PHONES AND ACCESSORIES WERE BOUGHT
	// AND HOW MUCH MONEY REMAINS IN THE ACCOUNT

	var TAX = 0.09;
	var PRICE = 500;
	var ACCESSORY_PRICE = 60;
	var THRESHOLD = 100;

	// HELPER FUNCTIONS ***********************
	calcTax = function(amount) {
		return amount * TAX;
	}

	formatPrice = function(number) {
		return "$"+parseFloat(Math.round(number * 100) / 100).toFixed(2);
	}

	var PHONE_TAX = calcTax(PRICE); //need this.calcTax(PRICE) here???
	var ACCESSORY_TAX = calcTax(ACCESSORY_PRICE);
	var PHONE_TOTAL = PRICE + PHONE_TAX;
	var ACCESSORY_TOTAL = ACCESSORY_PRICE + ACCESSORY_TAX;

	// PURCHASE FUNCTION **********************
	// increments count of items purchased 

	countPurchase = function(number) {
		var count = 0;

		return function(number) {
			count+=number;
			return count;
		}

	}

	var buyPhone = countPurchase();
	var buyAccessory = countPurchase();


	// BANKING FUNCTION ***********************
	// subtracts amount of purchase (plus tax) from bank balance

	calcBank = function(number) {
		var balance = 2500;
		
		return function(number) {
			balance -= number;
			return balance;
		}
	}

	var deductBank = calcBank();
	var checkBank = calcBank();


	// OUTPUT FUNCTION ************************

	printOutput = function() {
		
		var phonesPurchased = buyPhone(0);
		var phoneTotal = phonesPurchased * PHONE_TOTAL;
		var accessoriesPurchased = buyAccessory(0);
		var accessoryTotal = accessoriesPurchased * ACCESSORY_TOTAL;
		var totalPurchaseAmount = phoneTotal + accessoryTotal;
		var balance = deductBank(0);

		console.log("You bought " + phonesPurchased + " phones for " + formatPrice(phoneTotal) + " with tax");
		console.log("You bought " + accessoriesPurchased + " accessories for " + formatPrice(accessoryTotal) + " with tax");
		console.log("You spent " + formatPrice(totalPurchaseAmount));
		console.log("You have " + formatPrice(balance) + " left");
	}

	// EXPORT FUNCTIONS ****************************

	exports.calcTax = calcTax;
	exports.formatPrice = formatPrice;

	// IIFE/LOOP ***********************************

	exports.startSpree = function() {
		var startingFunds = checkBank(0);
		var toSpend = startingFunds - THRESHOLD;

		console.log("You started with " + formatPrice(startingFunds));
		console.log("You're willing to spend " + formatPrice(toSpend));

		while (toSpend > 0) {
			if (toSpend > PHONE_TOTAL) {
				buyPhone(1);
				deductBank(PHONE_TOTAL);
				toSpend -= PHONE_TOTAL;
				
			} else if (toSpend > ACCESSORY_TOTAL) {
				buyAccessory(1);
				deductBank(ACCESSORY_TOTAL);
				toSpend -= ACCESSORY_TOTAL;

			} else {
				printOutput();
				break;
			} 	
		} 
	};

})(typeof window === 'undefined' || window === null ? global.phoneSpree = {} : window.phoneSpree = {});

phoneSpree.startSpree();
