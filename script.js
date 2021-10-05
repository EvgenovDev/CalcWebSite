"use strict";

let title   = prompt("Введите название проекта", "Приложение для расчета стоимости услуги");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = prompt("Сколько $ будет стоить данная работа?", "2000");
let rollback = 30;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let answers = [];
let countQuestion = +prompt("Какое количество дополнительных услуг вам понадобится?", "2");
let sumAllServisePrice = 0;

for(let i = 0; i < countQuestion; i++) {
	answers.push({
		service: prompt("Какой вид услуги вам нужен?", "Добавить слайдер"),
		servicePrice: prompt("Сколько $ это будет стоить?", "50")
	});
}
//Функция счета стоимости работы + доп услуг
const fullPriceSum = (screensPrice, callback, arrayLength) => {  
	return screensPrice + callback(arrayLength);
};

//Функция подсчета стоимости всех услуг
const fullServicePrice = (length) => {
	for(let i = 0; i < length; i++){
		sumAllServisePrice = parseInt(sumAllServisePrice) + parseInt(answers[i].servicePrice);
	}
	return sumAllServisePrice;
};

let fullPrice = fullPriceSum(parseInt(screenPrice), fullServicePrice, answers.length);

let agentWorkPrice = (fullPrice * (rollback/100));
console.log("Процент отката посреднику за работу - " + agentWorkPrice + "$");

let servicePercentPrice = Math.ceil(fullPrice - agentWorkPrice);
console.log("Полная стоимость работы округленная до большего числа за вычетом процента отката посреднику за работу = " + fullPrice + ` - ` + agentWorkPrice + " = " + servicePercentPrice + "$");

console.log ("Стоимость верстки экранов - " + screenPrice + "$" +
				 "\nСтоимость разработки сайта - " + fullPrice + "$");

	if(fullPrice > 2000) { 
		console.log("Мы даем вам скидку в 10%");
	} else if (fullPrice >= 500 && fullPrice <= 2000) {
		console.log("Мы даем вам скидку в 5%");
	} else if (fullPrice <= 500 && fullPrice >= 0) {
		console.log("Скидка не предусмотрена");
	} else {
		console.log("Что-то пошло не так");
	}

console.log("title - " + typeof(title));
console.log("fullPrice - " + typeof(screenPrice));
console.log("adaptive - "  + typeof(adaptive));
console.log("Длина строки в переменной screens: " + screens.length);
console.log((screens.toLowerCase()).split(", "));