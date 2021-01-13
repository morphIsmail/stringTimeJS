//Месеца
const month = ["", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
//Месяца в именительном падеже
const monthIp = ["", "январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
//Форматирование времени
const options = { hour: 'numeric', minute: 'numeric' };

////Математические функции////
/**
 * Проверка на число
 * @param {number} n любое число или строка
 * @return {boolean} возвращает true если аргумент является числом, в противном случае false
 */
function isNumber(n) {
	return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}
/**
 * Случайное число в диапазоне от min до max
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 * @return {number} случайное число в указанном диапазоне
 */
function randomInteger(min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

////Функции по работе с временем////

/**
* Функция преобразует время в минуты.
* @param {string} time время в виде строки, например "02:08". Может быть в диапазоне от "00:00" до "23:59".
* @return {number} целое число в минутах. Например time="02:08" вернет 128.
*/
function timeToMinute(time) {
	try {
		let hour = +time.split(":")[0]//часы
		let minute = +time.split(":")[1]//минуты
		//Ошибка диапазона аргумента или его типа
		if(!(hour>=0 && hour<=23) || !(minute>=0 && minute<=59))
			throw new RangeError("Аргумент должент быть в формате 'hh:mm' - 'hh' должен быть от 0 до 23, а 'mm' должен быть от 0 до 59. 'hh' и 'mm' должны быть числами и разделяться знаком ':'")
		//Возвращаем результат если ошибок нет
		return hour*60+minute
	} catch(e) {
		//Если ошибка была, то выводим в консоль сообщение
		console.log(e)
	}
}

/**
* Функция преобразует минуты в строку с временем.
* @param {number} min время в виде целого числа, например 62. Может быть отрицательным числом.
* @return {string} время в виде строки. Например min=62 вернет "01:02",
* min=-5 вернет "23:55", min=1439 вернет "23:59", min=1440 вернет "00:00", min=2882 вернет "00:02".
*/
function minuteToTime(min) {
	try {
		let h, m, s
		//Ошибка типа аргумента
		if (!isNumber(min)) {
			throw new TypeError("Аргумент функции должен быть числом")
		}
		if (min < 0 || min > 1439) {
			let newMinute = min
			//-60 станет 1380 (-1 час = 23 часа)
			if (min < 0) {
				newMinute = min + (Math.trunc(Math.abs(min) / 1440) + 1) * 1440
			}
			let tmpHour = Math.trunc(newMinute / 60)
			let tmpMinute = newMinute % 60
			h = tmpHour % 24 + ""
			m = Math.trunc(tmpMinute % 60) + ""
			s = Math.trunc((tmpMinute % 60 - Math.trunc(tmpMinute % 60)) * 60) + ""
		} else {
			h = Math.trunc(min / 60) + ""
			m = Math.trunc(min % 60) + ""
			s = Math.trunc((min % 60 - Math.trunc(min % 60)) * 60) + ""
		}
		if (h.length === 1) h = "0" + h
		if (m.length === 1) m = "0" + m
		if (s.length === 1) s = "0" + s
		return h + ":" + m// + ":" + s
	} catch (e) {
		//Если ошибка была, то выводим в консоль сообщение
		console.log(e)
	}
}

/**
* Функция добавляет/вычитает из строки с временем время в минутах.
* @param {string} time время в виде строки, например "02:08".
* @param {number} change сколько минут добавить. Если отрицательное число, то вычесть.
* @return {string} время в виде строки. Например time="00:02" change=-5 вернет "23:57".
*/
function timeDivMinute(time, change) {
	return minuteToTime(timeToMinute(time)+change)
}

/**
* Функция вычитает или складывает две строки времени.
* @param {string} time1 время в виде строки, например "02:08".
* @param {string} time2 время в виде строки, например "01:03".
* @param {string} operator сложить строки "+", вычесть строки "-"
* @return {string} время в виде строки. Например time1="02:02" time2="01:01" operator="-" вернет "01:01".
*/
function timeDivTime(time1, time2, operator) {
	if(operator==="-")
		return minuteToTime(timeToMinute(time1)-timeToMinute(time2))
	if(operator==="+")
		return minuteToTime(timeToMinute(time1)+timeToMinute(time2))
}

/**
* Перевести строку в секунды или миллисекунды.
* @param {string} time время в виде строки, например "00:01".
* @param {string} type может быть "s" для перевода в секунды и "ms" для перевода в миллисекунды.
* @return {number} число секунд или миллисекунд. Например time="00:01" type="s" вернет 60.
*/
function changeTypeTime(time, type) {
	if(type==="s")
		return timeToMinute(time)*60
	if(type==="ms")
		return timeToMinute(time)*60*1000
}

/**
* Проверяет является ли аргумент временем
* @param {string} time строка времени типа "01:26"
* @return {boolean} true или false
*/
function isTime(time) {
	return isNumber(+time[0])
	&& isNumber(+time[1])
	&& time[2]==":"
	&& isNumber(+time[3])
	&& isNumber(+time[4])
}

/**
 * Сравнивает две строки с временем
 * @param {string} time1 первая строка с временем
 * @param {string} time2 вторая строка с временем
 * @return {number} 1 если первый аргумент больше второго, -1 если первый аргумент меньше второго, 0 если аргументы равны
 */
function compareTime(time1, time2) {
	let timeStr1 = timeToMinute(time1)
	let timeStr2 = timeToMinute(time2)
	if(timeStr1>timeStr2) return 1
	else if(timeStr1<timeStr2) return -1
	else if(timeStr1===timeStr2) return 0
	else console.log('Ошибка при сравнении двух строк с временем')
}
/**
 * Возвращает правильное склонение для указанного числа если задать вопрос: какое количество секунд, минут, часов, дней, недель, месяцев или лет?
 * @param {number} num целое число
 * @param {string} type тип возвращаемого значения (s-секунды, min-минуты, h-часы, d-дни, w-недели, m-месеца, y-годы)
 * @return {string} вернет строку: num + правильное склонение слова "секунда", "минута", "час", "день", "неделя", "месяц" или "год", в зависимости от параметра type (например: 1 день, 254 года, 2114 недель)
 */
function decOfNum(num, type) {
	//Все варианты склонений для каждого из слов
	let text = [
		["секунда", "секунды", "секунд"],
		["минута", "минуты", "минут"],
		["час", "часа", "часов"],
		["день", "дня", "дней"],
		["неделя", "недели", "недель"],
		["месяц", "месяца", "месяцев"],
		["год", "года", "лет"],
	]
	//Число от 0 до 6 для параметров s, min, h, d, w, m, y соответственно
	let tmpType
	//Проверка на правильность аргументов
	try {
		//Если первый аргумент не явялется целым числом
		if(!Number.isInteger(+num)) throw new TypeError("Первый аргумент должен быть целым числом");
		switch(type) {
			case "s": tmpType=0; break
			case "min": tmpType=1; break
			case "h": tmpType=2; break
			case "d": tmpType=3; break
			case "w": tmpType=4; break
			case "m": tmpType=5; break
			case "y": tmpType=6; break
			//Если второй аргумент не соответствует не одному из доступных, то ошибка
			default: throw new TypeError("Второй аргумент должен быть строкой: s, min, h, d, w, m или y");
		}
	} catch(e) {
		//Вывести ошибку в консоль, если была и выйти из функции
		console.log(e)
		return
	}
	//Преобразовать целую часть числа num в строку (дробная часть отбрасывается)
	num=num+""
	//Для чисел 5, 6, 7, 8, 9 или 0 
	//Для чисел состоящих из более двух цифр и оканчивающихся на цифру 5, 6, 7, 8, 9 или 0 (например: 55 дней, 38 дней, 47 дней)
	//Для чисел состоящих из более двух цифр, у которых предпоследняя цифра равна 1 (например: 11 лет, 116 часов, 214 дней)
	if(
		(num.length>=2 && num[num.length-1]==5) || 
		(num.length>=2 && num[num.length-1]==6) || 
		(num.length>=2 && num[num.length-1]==7) || 
		(num.length>=2 && num[num.length-1]==8) || 
		(num.length>=2 && num[num.length-1]==9) || 
		(num.length>=2 && num[num.length-1]==0) ||
		(num.length>=2 && num[num.length-2]==1) || 
		num==5 || num==6 || num==7 || num==8 || num==9 || num==0
	)
		return num+" "+text[tmpType][2]
	//Для чисел 2, 3 или 4
	//Для чисел состоящих из более двух цифр, у которых предпоследняя цифра не равна 1, а последняя цифра равна 2, 3 или 4 (например: 22 минуты, 234 часа, 6423 месяца)
	if(
		(num.length>=2 && num[num.length-1]==2 && num[num.length-2]!==1) || 
		(num.length>=2 && num[num.length-1]==3 && num[num.length-2]!==1) || 
		(num.length>=2 && num[num.length-1]==4 && num[num.length-2]!==1) ||
		num==2 || num==3 || num==4
	)
		return num+" "+text[tmpType][1]
	//Для числа 1
	//Для чисел состоящих из более двух цифр, у которых предпоследняя цифра не равна 1, а последняя цифра равна 1 (например: 21 год, 631 день, 48251 секунда)
	if(
		(num.length>=2 && num[num.length-1]==1 && num[num.length-2]!==1) || 
		num==1
	)
		return num+" "+text[tmpType][0]
}