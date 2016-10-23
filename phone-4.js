"use strict";

var TAX = 0.09;
var PRICE = 500;
var ACCESSORY_PRICE = 60;
var THRESHOLD = 100;

var PHONE_TAX = calcTax(PRICE);
var ACCESSORY_TAX = calcTax(ACCESSORY_PRICE);

var PHONE_TOTAL = PRICE + PHONE_TAX;
var ACCESSORY_TOTAL = ACCESSORY_PRICE + ACCESSORY_TAX;

//var balance = 2500;
//var toSpend = balance - THRESHOLD;

//var purchaseAmount = 0;
//var purchaseTotal = 0;

//var phonesPurchased = 0;
//var accessoriesPurchased = 0;


// HELPER FUNCTIONS ***********************
function calcTax(purchaseAmount) {
	return purchaseAmount * TAX;
}

function formatPrice(number) {
	return "$"+parseFloat(Math.round(number * 100) / 100).toFixed(2);
}

// PURCHASE FUNCTION **********************
// increments count of items purchased 

function countPurchase() {
	var count = 0;

	return function() {
		count++;
	}

}

var buyPhone = countPurchase();
var buyAccessory = countPurchase();



// CART FUNCTION **************************
// adds amount of purchase (plus tax) to cart total

function calcTotal(amount) {
	var count = 0;

	return function() {
		count += amount;
		return count;
		
	}	
	
}

var addPhoneToTotal = calcTotal(PHONE_TOTAL);
var addAccessoryToTotal = calcTotal(ACCESSORY_TOTAL);



// BANKING FUNCTION ***********************
// subtracts amount of purchase (plus tax) from bank balance

function calcBank(amount) {
	var balance = 2500;

	return function() {
		balance -= amount;
		return balance;
		
	}
	
}



// OUTPUT FUNCTION ************************
function printOutput() {
	var total = calcBank(addPhoneToTotal) + calcBank(addAccessoryToTotal);

	console.log("you bought " + buyPhone ()+ " phones");
	console.log("you bought " + buyAccessory() + " accessories");
	//console.log("you spent " + formatPrice(purchaseTotal) + " dollars");
	console.log("you have " + formatPrice(total) + " dollars left");
	
	
}

// LOOP ***********************************
//wrap in IIFE?



(function() {
	var checkBank = calcBank(0);
	console.log(checkBank());
	
	var toSpend = checkBank() - THRESHOLD;
	console.log(toSpend);

	while (toSpend > 0) {
		if (toSpend > PHONE_TOTAL) {

			buyPhone();
			console.log("phone purchased");
			calcTotal(PHONE_TOTAL);
			calcBank(PHONE_TOTAL);
			toSpend -= PHONE_TOTAL;
			
		} else if (toSpend > ACCESSORY_TOTAL) {
			buyAccessory();
			console.log("accessory purchased");
			calcTotal(ACCESSORY_TOTAL);
			calcBank(ACCESSORY_TOTAL);
			
			toSpend -= ACCESSORY_TOTAL;
			
		} else {
			printOutput();
			break;
		} 	
	} 
})();
