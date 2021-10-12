"use strict";

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
	 answers: [],

	start: () => {
	appData.asking();
	appData.sumAllScreenPrice();
	appData.fullPriceSum(appData.screenPrice, appData.fullServicePrice, appData.answers.length);
	appData.getAgentWorkPrice();
	appData.getServicePricePercent();
	appData.getTitle(appData.title);
	appData.logger();
	},

	 asking: () => {
		appData.questionTitle();
		appData.questionScreenPrice();
		appData.questionAdaptive();
		appData.questionCount();
		appData.servicePriceQuestions(appData.countQuestion);
	},

	questionTitle: () => {
		do {
			appData.title = prompt("Введите название проекта", "Приложение для расчета стоимости услуги");
		} while (appData.isNumber(appData.title));
	},
	
	questionAdaptive: () => {
		do {
			appData.adaptive = confirm("Нужен ли адаптив на сайте?");
		} while(appData.isNumber(appData.adaptive));
	},

	questionCount: () => {
		do {
			appData.countQuestion = +prompt("Какое количество дополнительных услуг вам понадобится?", "2");
		} while (!appData.isNumber(appData.countQuestion));
		appData.saveNumber(appData.countQuestion);
	},

	questionScreenPrice: () => {
		let count;
		let question;
		for (let i = 0; i < 2; i++){
			do {
				question = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
			} while(appData.isNumber(question));
			do {
				count = prompt("Сколько $ будет стоить данная работа?", "2000");
			} while (!appData.isNumber(count));
			count = appData.saveNumber(count); 
			appData.screens.push({id: i, name: question, price: count});
		}
	},

	sumAllScreenPrice: () => {
		appData.screenPrice = appData.screens.reduce((sum, current) => {
			return sum.price + current.price;
		});
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
		appData.fullPrice =  screensPrice + callback(arrayLength);
	},
	
	//Функция подсчета стоимости всех доп услуг
	fullServicePrice: (length) => {
		let sumAllServisePrice = 0;
		for(let i = 0; i < length; i++) {
			sumAllServisePrice = sumAllServisePrice + parseFloat(appData.answers[i].servicePrice);	
		}
		return sumAllServisePrice;
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
		appData.servicePercentPrice =  Math.ceil(appData.fullPrice - appData.agentWorkPrice);
	},
	
	getAgentWorkPrice: () => {
		appData.agentWorkPrice =  (appData.fullPrice * (appData.rollback/100));
	},
	
	showTypeOf: (variable) => {
		return variable + " - " + typeof variable;
	},
	
	getTitle: (str) => {
		if (str === null) {
			appData.title =  "Нет названия проекта";
		} else if (str[0] != " ") {
			appData.title =  str[0].toUpperCase() + str.substring(1, str.length).toLowerCase();
		} else {
			let i = 1;
			do{
				i++;
			} while (str[i] == " ");
			appData.title =  str[i].toUpperCase() + str.substring(i + 1, str.length).toLowerCase();
		}
	},
	
	logger: () => {
		console.log(appData.showTypeOf(appData.title));
		console.log(appData.showTypeOf(appData.screens));
		console.log(appData.showTypeOf(appData.adaptive));
		console.log(appData.screens);
		console.log(appData.showSaleMessage(appData.fullPrice));
		console.log("Полная стоимость работы округленная до большего числа за вычетом процента отката посреднику за работу = " + appData.servicePercentPrice + "$");
		for (let key in appData) {
			console.log(key + ": " + appData[key]);
		}
	}

};

appData.start();
