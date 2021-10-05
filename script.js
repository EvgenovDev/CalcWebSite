"use strict";

let title   = prompt("Введите название проекта", "Приложение для расчета стоимости услуги");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = prompt("Сколько $ будет стоить данная работа?", "2000");
let rollback = 30;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let answers = [];
let countQuestion = +prompt("Какое количество дополнительных услуг вам понадобится?", "2");
let sumAllServisePrice = 0;

//Функция рассчета стоимости работы + доп услуг
function fullPriceSum (screensPrice, callback, arrayLength) {  
	return screensPrice + callback(arrayLength);
}

//Функция подсчета стоимости всех доп услуг
const fullServicePrice = (length) => {
	for(let i = 0; i < length; i++){
		sumAllServisePrice = parseInt(sumAllServisePrice) + parseInt(answers[i].servicePrice);
	}
	return sumAllServisePrice;
};
//Функция вывода скидки 
const showSaleMessage = (price) => {
	if(price > 2000) { 
		return "Мы даем вам скидку в 10%";
	} else if (price >= 500 && price <= 2000) {
		return "Мы даем вам скидку в 5%";
	} else if (price <= 500 && price >= 0) {
		return "Скидка не предусмотрена";
	} else {
		return "Что-то пошло не так";
	}
};
//Функция заполнения массива с доп услугами
const servicePriceQuestions = (count) => {
	for(let i = 0; i < count; i++) {
		answers.push({
			service: prompt("Какой вид услуги вам нужен?", "Добавить слайдер"),
			servicePrice: prompt("Сколько $ это будет стоить?", "50")
		});
	}
};

const getServicePricePercent = () =>{
	return Math.ceil(fullPrice - agentWorkPrice);
};

const getAgentWorkPrice = () => {
	return (fullPrice * (rollback/100));
};

const showTypeOf = (variable) => {
	return variable + " - " + typeof variable;
};

const getTitle = (str) => {
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
};

servicePriceQuestions(countQuestion);
let fullPrice = fullPriceSum(parseInt(screenPrice), fullServicePrice, answers.length);
let agentWorkPrice = getAgentWorkPrice();
let servicePercentPrice = getServicePricePercent();
title = getTitle(title);

console.log(showTypeOf(title));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log((screens.toLowerCase()).split(", "));
console.log(showSaleMessage(fullPrice));
console.log("Полная стоимость работы округленная до большего числа за вычетом процента отката посреднику за работу = " + servicePercentPrice + "$");