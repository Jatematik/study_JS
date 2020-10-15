'use strict';

let money = 25000;
let income = 'Фриланс';
let addExpenses = 'Квартира, продукты, кошка';
let deposit = true;
let mission = 100000;
let period = 6;
let budgetDay = money/30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
addExpenses.toLowerCase();
console.log(addExpenses.split(', '));
console.log(budgetDay);

money = Number(prompt('Ваш месячный доход?'));
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = Number(prompt('Во сколько это обойдется?'));
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = Number(prompt('Во сколько это обойдется?'));

let getExpensesMonth = function(){
    return amount1 + amount2;
};
console.log(getExpensesMonth());

let getAccumulatedMonth = function(){
    return money - getExpensesMonth();
};

let accumulatedMonth  = getAccumulatedMonth();

let getTargetMonth = function(){
    return Math.ceil(mission/accumulatedMonth);
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
