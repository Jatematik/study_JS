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

let expensesAmount,
    accumulatedMonth,
    budgetDay;

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
        let a;
        let b;
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i =0; i < 2; i++) {
            a = prompt('Введите обязательную статью расходов');
            do {
                b = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(b));
            appData.expenses[a] = b;
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function (){
        let sum = 0;
        let a = appData.expenses;
        for (let key in a) {
            let c = Number(a[key]);
            sum += c;
        }
        return sum;
    },
    getAccumulatedMonth: function(){
        return money - expensesAmount;
    },
    getTargetMonth: function(){
        let result = 0;
        result = Math.ceil(appData.mission/accumulatedMonth);
        if (result < 0) {
            return ('Цель не будет достигнута');
        }
        return ('Цель будет достигнута через: ' + result + ' месяцев');
    },
    getStatusIncome: function(){
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
    },
};
appData.asking();
console.log(appData);

budgetDay = money/30;

appData.expensesMonth = appData.getExpensesMonth(); // expensesAmount

console.log(appData.expensesMonth); // expensesAmount

accumulatedMonth  = appData.getAccumulatedMonth();

console.log(appData.getTargetMonth());

budgetDay = Math.floor(accumulatedMonth/30);

console.log('Бюджет на день: ' + budgetDay);

console.log(appData.getStatusIncome());
