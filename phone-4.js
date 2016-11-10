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

var PHONE_TAX = calcTax(PRICE);
var ACCESSORY_TAX = calcTax(ACCESSORY_PRICE);

var PHONE_TOTAL = PRICE + PHONE_TAX;
var ACCESSORY_TOTAL = ACCESSORY_PRICE + ACCESSORY_TAX;


// HELPER FUNCTIONS ***********************
function calcTax(amount) {
	return amount * TAX;
}

function formatPrice(number) {
	return "$"+parseFloat(Math.round(number * 100) / 100).toFixed(2);
}

// PURCHASE FUNCTION **********************
// increments count of items purchased 

function countPurchase(number) {
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

function calcBank(number) {
	var balance = 2500;
	
	return function(number) {
		balance -= number;
		return balance;
	}
}

var deductBank = calcBank();
var checkBank = calcBank();


// OUTPUT FUNCTION ************************

function printOutput() {
	
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

// IIFE/LOOP ***********************************

(function() {
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
})();
