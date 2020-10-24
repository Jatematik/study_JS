'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let calculateBtn = document.getElementById('start'),
    firstPlus = document.getElementsByTagName('button')[0],
    secondPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    expensesObligatory = document.querySelector('.expenses-items .expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    incomeItem = document.querySelectorAll('.income-items');

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function(){
        appData.budget = Number(salaryAmount.value);
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            secondPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, firstPlus);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            firstPlus.style.display = 'none';
        }
    },
    getIncome: function () {
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += Number(appData.income[key]);
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) { 
            item =  item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function (){
        for (let key in appData.expenses) {
            appData.expensesMonth += Number(appData.expenses[key]);
        }
        return appData.expensesMonth;
    },
    getBudget: function(){ 
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function(){
        let result = 0;
        result = Math.ceil(targetAmount.value/appData.budgetMonth);
        if (result < 0) {
            return ('Цель не будет достигнута');
        }
        return result;
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
    calcPeriod: function (){
        return appData.budgetMonth * periodSelect.value;
    },
    getPeriod: function () {
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
    },
};

calculateBtn.addEventListener('click', function(event){
    if (salaryAmount.value === '') {
        event.preventDefault();
        return;
    }
    appData.start();
});
secondPlus.addEventListener('click', appData.addExpensesBlock);
firstPlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);