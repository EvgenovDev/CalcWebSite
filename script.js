"use strict";

let appData = {
	 title: '',
	 screens: '', 
	 adaptive: true,
	 countQuestion: 0, 
	 fullPrice: 0,
	 agentWorkPrice: 0,
	 servicePercentPrice: 0,
	 screenPrice: 0,
	 rollback: 30,
	 answers: [],
	 sumAllServisePrice: 0,

	start: () => {
	appData.asking();

	appData.fullPrice = appData.fullPriceSum(appData.screenPrice, appData.fullServicePrice, appData.answers.length);
	appData.agentWorkPrice = appData.getAgentWorkPrice();
	appData.servicePercentPrice = appData.getServicePricePercent();
	appData.title = appData.getTitle(appData.title);
	appData.logger();
	},

	 asking: () => {
		appData.title   = prompt("Введите название проекта", "Приложение для расчета стоимости услуги");
		appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
		appData.screenPrice = appData.getScreenPrice();
		appData.adaptive = confirm("Нужен ли адаптив на сайте?");
		appData.countQuestion = +prompt("Какое количество дополнительных услуг вам понадобится?", "2");
		appData.servicePriceQuestions(appData.countQuestion);
	},
	
	getScreenPrice: () => {
		let count;
		do {
			count = prompt("Сколько $ будет стоить данная работа?", "2000");
		} while (!appData.isNumber(count));
		return appData.saveNumber(count);
	},
	
	isNumber: (num) => {
		return !isNaN(parseFloat(num)) && isFinite(num) && (num !== null);
	},
	
	//Функция обрезки пробелов 
	saveNumber: (str) => {
		let arr = [];
		for (let i = 0; i < str.length; i++) {
			if (str[i] !== " " && str !== null) {
				arr.push(str[i]);
			} else {
				continue;
			}
		}
		return Number(arr.join(''));
	},
	
	//Функция рассчета стоимости работы + доп услуг
	fullPriceSum (screensPrice, callback, arrayLength) {  
		return screensPrice + callback(arrayLength);
	},
	
	//Функция подсчета стоимости всех доп услуг
	fullServicePrice: (length) => {
		for(let i = 0; i < length; i++) {
			appData.sumAllServisePrice = appData.sumAllServisePrice + parseFloat(appData.answers[i].servicePrice);	
		}
		return appData.sumAllServisePrice;
	},
	//Функция вывода скидки 
	showSaleMessage: (price) => {
		if(price > 2000) { 
			return "Мы даем вам скидку в 10%";
		} else if (price >= 500 && price <= 2000) {
			return "Мы даем вам скидку в 5%";
		} else if (price <= 500 && price >= 0) {
			return "Скидка не предусмотрена";
		} else {
			return "Что-то пошло не так";
		}
	},
	//Функция заполнения массива с доп услугами
	servicePriceQuestions: (count) => {
		for(let i = 0; i < count; i++) {
			let firstAnswer = prompt("Какой вид услуги вам нужен?", "Добавить слайдер");
			let secondAnswer;
			do {
				secondAnswer = prompt("Сколько $ это будет стоить?", "50");
			} while (!appData.isNumber(secondAnswer));
			appData.answers.push({
				service: firstAnswer,
				servicePrice: secondAnswer
			});
		}
	},
	
	getServicePricePercent: () =>{
		return Math.ceil(appData.fullPrice - appData.agentWorkPrice);
	},
	
	getAgentWorkPrice: () => {
		return (appData.fullPrice * (appData.rollback/100));
	},
	
	showTypeOf: (variable) => {
		return variable + " - " + typeof variable;
	},
	
	getTitle: (str) => {
		if (str === null) {
			return "Нет названия проекта";
		} else if (str[0] != " ") {
			return str[0].toUpperCase() + str.substring(1, str.length).toLowerCase();
		} else {
			let i = 1;
			do{
				i++;
			} while (str[i] == " ");
			return str[i].toUpperCase() + str.substring(i + 1, str.length).toLowerCase();
		}
	},
	
	logger: () => {
		console.log(appData.showTypeOf(appData.title));
		console.log(appData.showTypeOf(appData.screenPrice));
		console.log(appData.showTypeOf(appData.adaptive));
		console.log((appData.screens.toLowerCase()).split(", "));
		console.log(appData.showSaleMessage(appData.fullPrice));
		console.log("Полная стоимость работы округленная до большего числа за вычетом процента отката посреднику за работу = " + appData.servicePercentPrice + "$");
		for (let key in appData) {
			console.log(key + ": " + appData[key]);
		}
	}

};

appData.start();
