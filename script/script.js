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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    period: 5,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){

        if (confirm('Есть ли у вас дополнительный источник заработок?')){
            let itemIncome = prompt('Какой у вас дополнительный заработок?');
            let cashIncome;
            do {
                cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?');
            }
            while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        let a;
        let b;
        appData.addExpenses = addExpenses.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase();});
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
    getExpensesMonth: function (){
        for (let key in appData.expenses) {
            appData.expensesMonth += Number(appData.expenses[key]);
        }
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
    getInfoDeposit: function(){
        if(appData.deposit){
            do {
                appData.percentDeposit = prompt('Какой годовой процент?');
            }
            while(!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function (){
        return appData.budgetMonth * appData.period;
    }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
console.log(appData);

console.log(appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(appData.addExpenses);