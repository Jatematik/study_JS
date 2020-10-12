'use strict';

let money = 25000;
let income = 'Фриланс';
let addExpenses = 'Квартира, продукты, кошка';
let deposit = true;
let mission = 100000;
let period = 6;

// alert('Начинаю курс по JS');
console.log('Привет!');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses.toLowerCase();
console.log(addExpenses.split(', '));


let budgetDay = money/30;
console.log(budgetDay);

// УСЛОЖНЕННОЕ ЗАДАНИЕ УРОКА 2

let num = 266219;
function opNumbers(num) {
    if (!num)
        return 0;
    var result = 1;
    while (num) {
        result *= num % 10;
        num = Math.floor(num / 10);
    }
    return result;
}
console.log(opNumbers(num));
num = opNumbers(num);
num = num ** 3;
console.log(num);
console.log(String(num).slice(0, 2));

// УРОК 3

money = Number(prompt('Ваш месячный доход?'));
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = Number(prompt('Во сколько это обойдется?'));
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = Number(prompt('Во сколько это обойдется?'));
let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц равен' + budgetMonth);
console.log('Цель будет достигнута за: ' + Math.ceil(mission/budgetMonth) + ' месяцев');
budgetDay = Math.floor(budgetMonth/30);
console.log('Бюджет на день: ' + budgetDay);
if (budgetDay > 1200){console.log('У вас высокий уровень дохода!');}
if (1200 > budgetDay > 600){console.log('У вас средний уровень дохода');}
if (600 > budgetDay > 0){console.log('К сожалению у вас уровень дохода ниже среднего');}
if (budgetDay < 0){console.log('Что-то пошло не так');}