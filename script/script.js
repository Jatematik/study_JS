'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 6;
let budgetDay = money/30;
let expenses = [];

let start = function(){
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};
start();

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

let getExpensesMonth = function(){
    let sum = 0;
    let b = 0;
    for(let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов');
        do {
            b = +prompt('Во сколько это обойдется?');
        }
        while (!isNumber(b));
        sum += b;
    }
    console.log(expenses);
    return sum;
};
let expensesAmount = getExpensesMonth();

console.log(expensesAmount);

let getAccumulatedMonth = function(){
    return money - expensesAmount;
};

let accumulatedMonth  = getAccumulatedMonth();

let getTargetMonth = function(){
    let result = 0;
    result = Math.ceil(mission/accumulatedMonth);
    if (result < 0) {
        return ('Цель не будет достигнута');
    }
    return ('Цель будет достигнута через: ' + result + ' месяцев');
};
console.log(getTargetMonth());

budgetDay = Math.floor(accumulatedMonth/30);

console.log('Бюджет на день: ' + budgetDay);

let getStatusIncome = function(){
    if (budgetDay > 1200){
        return ('У вас высокий уровень дохода!');
    }
    else if (1200 >= budgetDay && budgetDay > 600){
        return ('У вас средний уровень дохода');
    }
    else if (600 >= budgetDay && budgetDay > 0){
        return ('К сожалению у вас уровень дохода ниже среднего');
    }
    else if (budgetDay <= 0){
        return ('Что-то пошло не так');
    }
};
console.log(getStatusIncome());
