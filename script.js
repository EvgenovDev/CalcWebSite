let title   = "StartProjectJS",
	 screens = "Простые, Сложные, Интерактивные",
	 screenPrice = 500,
	 rollback = 30,
	 fullPrice = 2000,
	 adaptive = true;

console.log("title - " + typeof(title) +
"\nfullPrice - " + typeof(screenPrice) +
"\nadaptive - "  + typeof(adaptive));

console.log("Длина строки в переменной screens: " + screens.length);

console.log ("Стоимость верстки экранов - " + screenPrice + "$" +
				 "\nСтоимость разработки сайта - " + fullPrice + "$");

console.log((screens.toLowerCase()).split(", "));

console.log("Процент отката посреднику за работу - " + (fullPrice * (rollback/100)) + "$");