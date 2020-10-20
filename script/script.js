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
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');


    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function (){
        let a;
        let b;
        let c;
        let sum = 0;
        for (let i =0; i < 2; i++) {
            a = prompt('Введите обязательную статью расходов');
            do {
                b = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(b));
            appData.expenses[a] = b;
            c = Number(b);
            sum += c;
        }
        console.log(sum);
        return sum;

        // let expenses = [];
        // let sum = 0;
        // let b = 0;
        // for(let i = 0; i < 2; i++){
        //     expenses[i] = prompt('Введите обязательную статью расходов');
        //     do {
        //         b = prompt('Во сколько это обойдется?');
        //     }
        //     while (!isNumber(b));
        //     let c = Number(b);
        //     sum += c;
        // }
        // console.log(expenses);
        // return sum;
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

expensesAmount = appData.getExpensesMonth();

console.log(expensesAmount);

accumulatedMonth  = appData.getAccumulatedMonth();

console.log(appData.getTargetMonth());

budgetDay = Math.floor(accumulatedMonth/30);

console.log('Бюджет на день: ' + budgetDay);

console.log(appData.getStatusIncome());
