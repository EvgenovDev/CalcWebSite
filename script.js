"use strict";
const title = document.getElementsByTagName("h1")[0];
const buttonStart = document.getElementsByClassName("handler_btn")[0];
const buttonReset = document.getElementsByClassName("handler_btn")[1];
const buttonPlus = document.querySelector(".screen-btn");

const otherItems1 = document.querySelectorAll(".other-items.percent");
const otherItems2 = document.querySelectorAll(".other-items.number");
const rollbackInput = document.querySelector('.rollback [type="range"]');
const inputRangeValue = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screenDiv = document.querySelectorAll(".screen");

let appData = {
	 screensCount: 0,
	 screens: [], 
	 screenPrice: 0,
	 fullPrice: 0,
	 serviceWorkPercent: 0,
	 agentWorkPrice: 0,
	 serviceNumberPrice: 0,
	 servicePercentPrice: 0,
	 rollback: 0,
	 servicesPercent: {},
	 servicesNumber: {},

	init: () => {
		appData.addTitle();
		setInterval(() => appData.success(), 1000);

		buttonPlus.addEventListener("click", appData.addScreenBlock);
		buttonStart.addEventListener("click", appData.start);
		rollbackInput.addEventListener("input", () => {
			inputRangeValue.textContent = rollbackInput.value + "%";
			appData.rollback = rollbackInput.value;
		});
	},

	success: () => {
		screenDiv = document.querySelectorAll(".screen");
			for(let i = 0; i < screenDiv.length; i++) {
				if (screenDiv[i].querySelector("select").selectedIndex === 0 || screenDiv[i].querySelector("input").value === "") {
					buttonStart.disabled = true;
					break;
				} else { 	
					buttonStart.disabled = false;
				}
			}
	},

	start: () => {
		appData.addScreenPrice();
		appData.addServicesPercent();
		appData.addServicesNumber();
		appData.addPrices();
		appData.showResult();
		console.log(appData);
	},

	showResult: () => {
		total.value = appData.screenPrice;
		totalCount.value = appData.screensCount;
		totalCountOther.value = appData.serviceNumberPrice + appData.servicePercentPrice;
		totalFullCount.value = appData.fullPrice;
		totalCountRollback.value = appData.serviceWorkPercent;
	},

	addServicesPercent: () => { 
		otherItems1.forEach((elem) => {
			const label = elem.querySelector("label").textContent;
			const percent = +elem.querySelector('input[type=text]').value;
			const check = elem.querySelector('input[type=checkbox]');
			 if (check.checked) {
					appData.servicesPercent[label] = +percent;
			 }
		});
	},

	addServicesNumber: () => { 
		otherItems2.forEach((elem) => {
			const label = elem.querySelector("label").textContent;
			const number = +elem.querySelector('input[type=text]').value;
			const check = elem.querySelector('input[type=checkbox]');
			 if (check.checked) {
					appData.servicesNumber[label] = +number;
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
				price: +input.value * +select.value,
				count: +input.value
			});
		});
	},

	addTitle: () => {
		document.title = title.textContent;
	},

	addPrices: () => { 
		// Подсчет кол-ва экранов
		for(let i = 0; i < appData.screens.length; i++) {
			appData.screensCount = appData.screensCount + appData.screens[i].count; 
		}
		// Подсчет суммы экранов
		for (let i = 0; i < appData.screens.length; i++){
			appData.screenPrice = appData.screenPrice +appData.screens[i].price;
		}
		//Подсчет доп услуг в руб 
		for (let key in appData.servicesNumber) {
				appData.serviceNumberPrice += appData.servicesNumber[key];	
		}
		// Подсчет суммы доп услуг с %
		for(let key in appData.servicesPercent) {
			appData.servicePercentPrice += (appData.screenPrice * (appData.servicesPercent[key]/100));	
		}
		// Подсчет всей суммы
		appData.fullPrice = appData.servicePercentPrice + appData.serviceNumberPrice + appData.screenPrice;
		// Подсчет суммы посредника
		appData.agentWorkPrice =  (appData.fullPrice * (appData.rollback/100));
		// Подсчет стоимости с учетом отката
		appData.serviceWorkPercent = appData.fullPrice - appData.agentWorkPrice;
	},	
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
