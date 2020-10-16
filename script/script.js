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
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getMonth: function getExpensesMonth(){
        let sum = 0;
        let b = 0;
        let expenses = [];
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
    getMonth2: function getAccumulatedMonth(){
        let expensesAmount = appData.getExpensesMonth();
        return money - expensesAmount;
    },
    getMonth3: function getTargetMonth(){
        let accumulatedMonth  = appData.getAccumulatedMonth();
        let result = 0;
        result = Math.ceil(appData.mission/accumulatedMonth);
        if (result < 0) {
            return ('Цель не будет достигнута');
        }
        return ('Цель будет достигнута через: ' + result + ' месяцев');
    },
    getIncome: function getStatusIncome(){
        let budgetDay = money/30;
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
    }
};

console.log(appData.expensesAmount);

console.log(appData.getTargetMonth());

appData.budgetDay = Math.floor(appData.accumulatedMonth/30);

console.log('Бюджет на день: ' + appData.budgetDay);

console.log(appData.getStatusIncome());
