"use strict";

var TAX = 0.09;
var PRICE = 500;
var ACCESSORY_PRICE = 60;
var THRESHOLD = 100;

var PHONE_TAX = calcTax(PRICE);
var ACCESSORY_TAX = calcTax(ACCESSORY_PRICE);

var PHONE_TOTAL = PRICE + PHONE_TAX;
var ACCESSORY_TOTAL = ACCESSORY_PRICE + ACCESSORY_TAX;

var balance = 2500;

var toSpend = balance - THRESHOLD;

var purchaseAmount = 0;
var purchaseTotal = 0;

var phonesPurchased = 0;
var accessoriesPurchased = 0;



function calcTax(purchaseAmount) {
	return purchaseAmount * TAX;
}

function formatPrice(number) {
	return "$"+parseFloat(Math.round(number * 100) / 100).toFixed(2);
}

function buyPhone() {
	phonesPurchased++;
	purchaseTotal += PHONE_TOTAL;
	balance -= PHONE_TOTAL;
	toSpend -= PHONE_TOTAL;
}

function buyAccessory() {
	accessoriesPurchased++;
	purchaseTotal += ACCESSORY_TOTAL;
	balance -= ACCESSORY_TOTAL;
	toSpend -= ACCESSORY_TOTAL;
}

function printOutput() {
	console.log("you bought " + phonesPurchased + " phones");
	console.log("you bought " + accessoriesPurchased + " accessories");
	console.log("you spent " + formatPrice(purchaseTotal) + " dollars");
	console.log("you have " + formatPrice(balance) + " dollars left");
}

while (toSpend > 0) {
	if (toSpend > PHONE_TOTAL) {
		buyPhone();
		
	} else if (toSpend > ACCESSORY_TOTAL) {
		buyAccessory();
		
	} else {
		printOutput();
		break;
	} 	
} 
