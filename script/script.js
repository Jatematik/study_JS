'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function(){
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 5,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function getExpensesMonth(){
        let expenses = [];
        let sum = 0;
        let b = 0;
        for(let i = 0; i < 2; i++){
            expenses[i] = prompt('Введите обязательную статью расходов');
            do {
                b = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(b));
            let c = Number(b);
            sum += c;
        }
        console.log(expenses);
        return sum;
    },
};

let budgetDay = money/30;

let expensesAmount = appData.getExpensesMonth();

console.log(expensesAmount);

let getAccumulatedMonth = function(){
    return money - expensesAmount;
};

let accumulatedMonth  = getAccumulatedMonth();

let getTargetMonth = function(){
    let result = 0;
    result = Math.ceil(appData.mission/accumulatedMonth);
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
