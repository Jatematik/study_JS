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