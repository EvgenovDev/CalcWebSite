"use strict";
const title = document.getElementsByTagName("h1")[0];
const buttonStart = document.getElementsByClassName("handler_btn")[0];
const buttonReset = document.getElementsByClassName("handler_btn")[1];
const buttonPlus = document.querySelector(".screen-btn");
const otherItems1 = document.querySelectorAll(".other-items.percent");
const otherItems2 = document.querySelectorAll(".other-items.number");

const rollbackInput = document.querySelector('.rollback [type="range"]');
const inputRangeValue = document.querySelector('.rollback .range-value');

const totalInputs = document.getElementsByClassName("total-input");

let screenDiv = document.querySelectorAll(".screen");

let appData = {
	 title: '',
	 screens: [], 
	 screenPrice: 0,
	 adaptive: true,
	 countQuestion: 0, 
	 fullPrice: 0,
	 agentWorkPrice: 0,
	 servicePercentPrice: 0,
	 rollback: 30,
	 servicesPercent: {},
	 servcesNumber: {},

	 init: () => {
		appData.addTitle();
		setInterval(() => appData.success(), 1000);
		appData.addServices();

		buttonPlus.addEventListener("click", appData.addScreenBlock);
		buttonStart.addEventListener("click", appData.start);

	 },

	 success: () => {
		if (screenDiv[0].querySelector("select").selectedIndex === 0 || screenDiv[0].querySelector("input").value === "") {
			buttonStart.disabled = true;
		} else { 	
			buttonStart.disabled = false;
		}
	 },

	start: () => {
		appData.addScreenPrice();
		console.log(appData);
	// appData.asking();
	// appData.sumAllScreenPrice();
	// appData.fullPriceSum(appData.screenPrice, appData.fullServicePrice, appData.answers.length);
	// appData.getAgentWorkPrice();
	// appData.getServicePricePercent();
	// appData.logger();
	},

	//  asking: () => {
	// 	appData.servicePriceQuestions(appData.countQuestion);
	// },

	addServices: () => { 
		otherItems1.forEach((elem) => {
			const label = elem.querySelector("label").textContent;
			const percent = elem.querySelector('input[type=text]').value;
			const check = elem.querySelector('input[type=checkbox]');
			 if (check.checked) {
					appData.servicesPercent[label] = +percent;
			 }
		});
	},

	addScreenBlock: () => {	
		screenDiv = document.querySelectorAll(".screen");
		const clone = screenDiv[0].cloneNode(true);
		screenDiv[screenDiv.length - 1].after(clone);
		clone.querySelector("input").value = "";
	},

	addScreenPrice: () => {
		screenDiv = document.querySelectorAll(".screen");
		screenDiv.forEach((elem, index) => {
			const select = elem.querySelector("select");
			const input = elem.querySelector("input");
			const selectName = select.options[select.selectedIndex].textContent;

			appData.screens.push({
				id: index,
				name: selectName,
				price: +input.value * +select.value
			});
		});
	},

	addTitle: () => {
		document.title = title.textContent;
	},

// 	sumAllScreenPrice: () => {
// 		appData.screenPrice = appData.screens.reduce((sum, current) => {
// 			return sum.price + current.price;
// 		});
// 	},
	
// 	isNumber: (num) => {
// 		return !isNaN(parseFloat(num)) && isFinite(num) && (num !== null);
// 	},
	
// 	//Функция обрезки пробелов 
// 	saveNumber: (str) => {
// 		let arr = [];
// 		for (let i = 0; i < str.length; i++) {
// 			if (str[i] !== " " && str !== null) {
// 				arr.push(str[i]);
// 			} else {
// 				continue;
// 			}
// 		}
// 		return Number(arr.join(''));
// 	},
	
// 	//Функция рассчета стоимости работы + доп услуг
// 	fullPriceSum (screensPrice, callback, arrayLength) {  
// 		appData.fullPrice =  screensPrice + callback(arrayLength);
// 	},
	
// 	//Функция подсчета стоимости всех доп услуг
// 	fullServicePrice: (length) => {
// 		let sumAllServisePrice = 0;
// 		for(let i = 0; i < length; i++) {
// 			sumAllServisePrice = sumAllServisePrice + parseFloat(appData.answers[i].servicePrice);	
// 		}
// 		return sumAllServisePrice;
// 	},
// 	//Функция вывода скидки 
// 	showSaleMessage: (price) => {
// 		if(price > 2000) { 
// 			return "Мы даем вам скидку в 10%";
// 		} else if (price >= 500 && price <= 2000) {
// 			return "Мы даем вам скидку в 5%";
// 		} else if (price <= 500 && price >= 0) {
// 			return "Скидка не предусмотрена";
// 		} else {
// 			return "Что-то пошло не так";
// 		}
// 	},
// 	//Функция заполнения массива с доп услугами
// 	servicePriceQuestions: (count) => {
// 		for(let i = 0; i < count; i++) {
// 			let firstAnswer;
// 			let secondAnswer;
// 			do {
// 				firstAnswer = prompt("Какой вид услуги вам нужен?", "Добавить слайдер");
// 			} while(appData.isNumber(firstAnswer));
// 			do {
// 				secondAnswer = prompt("Сколько $ это будет стоить?", "50");
// 			} while (!appData.isNumber(secondAnswer));
// 			appData.answers.push({
// 				service: firstAnswer,
// 				servicePrice: secondAnswer
// 			});
// 		}
// 	},
	
// 	getServicePricePercent: () =>{
// 		appData.servicePercentPrice =  Math.ceil(appData.fullPrice - appData.agentWorkPrice);
// 	},
	
// 	getAgentWorkPrice: () => {
// 		appData.agentWorkPrice =  (appData.fullPrice * (appData.rollback/100));
// 	},
	
// 	showTypeOf: (variable) => {
// 		return variable + " - " + typeof variable;
// 	},
	
// 	logger: () => {
// 		console.log(appData.showTypeOf(appData.title));
// 		console.log(appData.showTypeOf(appData.screens));
// 		console.log(appData.showTypeOf(appData.adaptive));
// 		console.log(appData.screens);
// 		console.log(appData.showSaleMessage(appData.fullPrice));
// 		console.log("Полная стоимость работы округленная до большего числа за вычетом процента отката посреднику за работу = " + appData.servicePercentPrice + "$");
// 		for (let key in appData) {
// 			console.log(key + ": " + appData[key]);
// 		}
// 	}

};

appData.init();
