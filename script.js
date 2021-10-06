"use strict";

let title;
let screens; 
let adaptive;
let countQuestion; 
let fullPrice;
let agentWorkPrice;
let servicePercentPrice;
let screenPrice;
let rollback = 30;
let answers = [];
let sumAllServisePrice = 0;

const asking = () => {
	title   = prompt("Введите название проекта", "Приложение для расчета стоимости услуги");
	screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
	adaptive = confirm("Нужен ли адаптив на сайте?");
	countQuestion = +prompt("Какое количество дополнительных услуг вам понадобится?", "2");
}


const isNumber = (num) => {
	return !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
}

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
//Функция получения значения screenPrice от пользователя 
const getScreenPrice = () => {

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

asking();
servicePriceQuestions(countQuestion);

fullPrice = fullPriceSum(parseInt(screenPrice), fullServicePrice, answers.length);
agentWorkPrice = getAgentWorkPrice();
servicePercentPrice = getServicePricePercent();
title = getTitle(title);

console.log(showTypeOf(title));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log((screens.toLowerCase()).split(", "));
console.log(showSaleMessage(fullPrice));
console.log("Полная стоимость работы округленная до большего числа за вычетом процента отката посреднику за работу = " + servicePercentPrice + "$");