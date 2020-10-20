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
        appData.expensesMonth = sum;
        return appData.expensesMonth;
    },
    getBudget: function(){ 
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function(){
        let result = 0;
        result = Math.ceil(appData.mission/appData.budgetMonth);
        if (result < 0) {
            return ('Цель не будет достигнута');
        }
        return ('Цель будет достигнута через: ' + result + ' месяцев');
    },
    getStatusIncome: function(){
        if (appData.budgetDay > 1200){
            return ('У вас высокий уровень дохода!');
        }
        else if (1200 >= appData.budgetDay && appData.budgetDay > 600){
            return ('У вас средний уровень дохода');
        }
        else if (600 >= appData.budgetDay && appData.budgetDay > 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        }
        else if (appData.budgetDay <= 0){
            return ('Что-то пошло не так');
        }
    },
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
console.log(appData);

console.log(appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
