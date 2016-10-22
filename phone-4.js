"use strict";

var TAX = 0.09;
var PRICE = 500;
var ACCESSORY_PRICE = 60;
var THRESHOLD = 100;

var balance = 2500;

var toSpend = balance - THRESHOLD;

var purchaseAmount = 0;
var purchaseTotal = 0;

var phonesPurchased = 0;
var accessoriesPurchased = 0;

var phoneTax = calcTax(PRICE);
var accessoryTax = calcTax(ACCESSORY_PRICE);

var phoneTotal = PRICE + phoneTax;
var accessoryTotal = ACCESSORY_PRICE + accessoryTax;

function calcTax(purchaseAmount) {
	return purchaseAmount * TAX;
}

function formatPrice(number) {
	return "$"+parseFloat(Math.round(number * 100) / 100).toFixed(2);
}

function buyPhone() {
	phonesPurchased++;
	purchaseTotal += phoneTotal;
	balance -= phoneTotal;
	toSpend -= phoneTotal;
}

function buyAccessory() {
	accessoriesPurchased++;
	purchaseTotal += accessoryTotal;
	balance -= accessoryTotal;
	toSpend -= accessoryTotal;
}

function printOutput() {
	console.log("you bought " + phonesPurchased + " phones");
	console.log("you bought " + accessoriesPurchased + " accessories");
	console.log("you spent " + formatPrice(purchaseTotal) + " dollars");
	console.log("you have " + formatPrice(balance) + " dollars left");
}

while (toSpend > 0) {
	if (toSpend > phoneTotal) {
		buyPhone();
		
	} else if (toSpend > accessoryTotal) {
		buyAccessory();
		
	} else {
		printOutput();
		break;
	} 	
} 
