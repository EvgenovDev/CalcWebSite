"use strict";

let title   = prompt("Введите название проекта", "Приложение для расчета стоимости услуги");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные или Интерактивные или все перечисленные?");
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

let fullPriceSum = (firstServicePrice, secondServicePrice, screensPrice) => {
	let result =  screensPrice + firstServicePrice + secondServicePrice;
	return result;
};

let fullPrice = fullPriceSum(screenPrice, answers[0].servicePrice + answers[1].servicePrice);

console.log(fullPrice);

let agentWorkPrice = (fullPrice * (rollback/100));
console.log("Процент отката посреднику за работу - " + agentWorkPrice + " $ ");
//
let servicePercentPrice = Math.ceil(fullPrice - agentWorkPrice);
console.log("Полная стоимость работы округленная до большего числа за вычетом процента отката посреднику за работу = " + fullPrice + ` - ` + agentWorkPrice + " = " + servicePercentPrice);

console.log("title - " + typeof(title) +
"\nfullPrice - " + typeof(screenPrice) +
"\nadaptive - "  + typeof(adaptive));

console.log("Длина строки в переменной screens: " + screens.length);

console.log ("Стоимость верстки экранов - " + screenPrice + "$" +
				 "\nСтоимость разработки сайта - " + fullPrice + "$");

console.log((screens.toLowerCase()).split(", "));