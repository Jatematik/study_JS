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