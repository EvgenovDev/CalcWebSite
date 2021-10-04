"use strict";

let title   = prompt("Введите название проекта", "Приложение для расчета стоимости услуги");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = prompt("Сколько $ будет стоить данная работа?", "2000");
let rollback = 30;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let answers = [];

for(let i = 0; i < 2; i++) {
	let firstQuestion = prompt("Какой вид услуги вам нужен?", "Добавить слайдер");
	let secondQuestion = prompt("Сколько $ это будет?", "50");
	answers.push({
		service: firstQuestion,
		servicePrice: secondQuestion
	});
}
//Функция счета стоимости работы + доп услуг
let fullPriceSum = (firstServicePrice, secondServicePrice, screensPrice) => {  
	return screensPrice + firstServicePrice + secondServicePrice;
};

let fullPrice = fullPriceSum(parseInt(screenPrice), parseInt(answers[0].servicePrice),parseInt(answers[1].servicePrice));

let agentWorkPrice = (fullPrice * (rollback/100));
console.log("Процент отката посреднику за работу - " + agentWorkPrice + "$");

let servicePercentPrice = Math.ceil(fullPrice - agentWorkPrice);
console.log("Полная стоимость работы округленная до большего числа за вычетом процента отката посреднику за работу = " + fullPrice + ` - ` + agentWorkPrice + " = " + servicePercentPrice + "$");

console.log ("Стоимость верстки экранов - " + screenPrice + "$" +
				 "\nСтоимость разработки сайта - " + fullPrice + "$");

	if(fullPrice > 2000) {
		fullPrice = fullPrice - (fullPrice / 100 * 10) 
		console.log("Мы даем вам скидку в 10% -> Стоимость с учетом скидки = " + fullPrice + "$");
	} else if (fullPrice >= 500 && fullPrice <= 2000) {
		fullPrice = fullPrice - (fullPrice / 100 * 10) 
		console.log("Мы даем вам скидку в 5% -> Стоимость с учетом скидки = " + fullPrice + "$");
	} else if (fullPrice <= 500 && fullPrice >= 0) {
		console.log("Скидка не предусмотрена -> Полная стоимость = " + fullPrice + "$");
	} else {
		console.log("Что-то пошло не так");
	}

console.log("title - " + typeof(title) +
"\nfullPrice - " + typeof(screenPrice) +
"\nadaptive - "  + typeof(adaptive));

console.log("Длина строки в переменной screens: " + screens.length);

console.log((screens.toLowerCase()).split(", "));