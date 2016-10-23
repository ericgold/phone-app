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
function calcTax(purchaseAmount) {
	return purchaseAmount * TAX;
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

function calcBank(amount) {
	var balance = 2500;

	return function() {
		balance -= amount;
		return balance;
	}
	
}

var deductPhonePrice = calcBank(PHONE_TOTAL);
var deductAccessoryPrice = calcBank(ACCESSORY_TOTAL);



// OUTPUT FUNCTION ************************


function printOutput(balance) {
	var remaining = balance + THRESHOLD;
	var phonesPurchased = buyPhone(0);
	var phoneTotal = phonesPurchased * PHONE_TOTAL;
	var accessoriesPurchased = buyAccessory(0);
	var accessoryTotal = accessoriesPurchased * ACCESSORY_TOTAL;
	var totalPurchaseAmount = phoneTotal + accessoryTotal;
	
	console.log("you bought " + phonesPurchased + " phones for " + formatPrice(phoneTotal) + " with tax");
	console.log("you bought " + accessoriesPurchased + " accessories for " + formatPrice(accessoryTotal) + " with tax");
	console.log("you spent " + formatPrice(totalPurchaseAmount));
	console.log("you have " + formatPrice(remaining) + " left");
}

// LOOP ***********************************


(function() {
	var checkBank = calcBank(0);
	var startingFunds = checkBank();
	var currentFunds = checkBank();
	console.log("You started with " + formatPrice(startingFunds));
	
	var toSpend = currentFunds - THRESHOLD;
	console.log("You're willing to spend " + formatPrice(toSpend));

	while (toSpend > 0) {
		if (toSpend > PHONE_TOTAL) {

			buyPhone(1);
			//console.log("phone purchased for " + formatPrice(PRICE) + " plus " + formatPrice(PHONE_TAX) + " tax");
			//addPhoneToTotal();
			deductPhonePrice();
			checkBank();
			toSpend -= PHONE_TOTAL;
			
		} else if (toSpend > ACCESSORY_TOTAL) {
			buyAccessory(1);
			//console.log("accessory purchased for " + formatPrice(ACCESSORY_PRICE) + " plus " + formatPrice(ACCESSORY_TAX) + " tax");
			//addAccessoryToTotal();
			deductAccessoryPrice();
			checkBank();
			toSpend -= ACCESSORY_TOTAL;
			
		} else {
			printOutput(toSpend);
			break;
		} 	
	} 
})();
