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

const calculateBtn = document.getElementById('start');
const firstPlus = document.getElementsByTagName('button')[0];
const secondPlus = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncome = document.querySelectorAll('.additional_income-item');
const dayBudget = document.getElementsByClassName('budget_day-value')[0];
const monthConsumption = document.getElementsByClassName('expenses_month-value')[0];
const possibleIncome = document.getElementsByClassName('additional_income-value')[0];
const possibleCosts = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriod = document.getElementsByClassName('income_period-value')[0];
const monthTarget = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeAdd = document.querySelector('.income-items .income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesObligatory = document.querySelector('.expenses-items .expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

console.log(calculateBtn);
console.log(firstPlus);
console.log(secondPlus);
console.log(depositCheck);
console.log(additionalIncome);
console.log(dayBudget);
console.log(monthConsumption);
console.log(possibleIncome);
console.log(possibleCosts);
console.log(incomePeriod);
console.log(monthTarget);
console.log(salaryAmount);
console.log(incomeAdd);
console.log(incomeAmount);
console.log(expensesObligatory);
console.log(expensesAmount);
console.log(targetAmount);
console.log(periodSelect);

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