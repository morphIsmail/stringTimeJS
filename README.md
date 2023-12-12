# stringTime.js - Библиотека для работы с временем в строковом формате
Все функции имеют подробную документацию написанную на JSDoc с примерами использования функций и описанием всех параметров и возвращаемых значений.

## Всего 10 Функции (225 строк кода)
### 2 вспомогательные функции
1. Проверка на число
>isNumber(n)

2. Случайное число в диапазоне от min до max
>randomInteger(min, max)

### 8 функций для работы с временем
1. Функция преобразует время в минуты.
>timeToMinute(time)

2. Функция преобразует минуты в строку с временем.
>minuteToTime(min)

3. Функция добавляет/вычитает из строки с временем время в минутах.
>timeDivMinute(time, change)

4. Функция вычитает или складывает две строки времени.
>timeDivTime(time1, time2, operator)

5. Перевести строку в секунды или миллисекунды.
>changeTypeTime(time, type)

6. Проверяет является ли аргумент временем
>isTime(time)

7. Сравнивает две строки с временем
>compareTime(time1, time2)

8. Возвращает правильное склонение для указанного числа 
если задать вопрос: какое количество секунд, минут, часов, дней, недель, месяцев или лет?
>decOfNum(num, type)

### Литература:
1. <a href="https://ru.wikipedia.org/wiki/JSDoc" target="_blank">JSDoc</a>
2. <a href="https://learn.javascript.ru/exception" target="_blank">Перехват ошибок</a>
3. <a href="https://learn.javascript.ru/try-catch" target="_blank">Обработка ошибок</a>


### Исмаил Усеинов:
* __YouTube канал ITDoctor:__ https://www.youtube.com/c/ITDoctor
* __Телеграм:__ https://t.me/itdoctorstudio
* __Группа в ВК:__ https://vk.com/itdoctorstudio
