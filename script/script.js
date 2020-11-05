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
    incomeItem = document.querySelectorAll('.income-items'),
    resetBtn = document.querySelector('#cancel');

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
        this.budget = Number(salaryAmount.value);
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();

        calculateBtn.style.display = 'none';
        resetBtn.style.display = 'block';

        let allInputs = document.querySelectorAll('input[type=text]');
        allInputs.forEach(function(item){
            item.disabled = true;
        });

        firstPlus.disabled = true;
        secondPlus.disabled = true;

    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
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
        for (let key in this.income) {
            this.incomeMonth += Number(this.income[key]);
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
        for (let key in this.expenses) {
            this.expensesMonth += Number(this.expenses[key]);
        }
        return this.expensesMonth;
    },
    getBudget: function(){ 
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    },
    getTargetMonth: function(){
        let result = 0;
        result = Math.ceil(targetAmount.value/this.budgetMonth);
        if (result < 0) {
            return ('Цель не будет достигнута');
        }
        return result;
    },
    getStatusIncome: function(){
        if (this.budgetDay > 1200){
            return ('У вас высокий уровень дохода!');
        }
        else if (1200 >= this.budgetDay && this.budgetDay > 600){
            return ('У вас средний уровень дохода');
        }
        else if (600 >= this.budgetDay && this.budgetDay > 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        }
        else if (this.budgetDay <= 0){
            return ('Что-то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do {
                this.percentDeposit = prompt('Какой годовой процент?');
            }
            while(!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while (!isNumber(this.moneyDeposit));
        }
    },
    calcPeriod: function (){
        return this.budgetMonth * periodSelect.value;
    },
    getPeriod: function () {
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
    },
    reset: function (){
        let allInputs = document.querySelectorAll('input[type=text]');
        allInputs.forEach(function(item){
            item.disabled = false;
            item.value = '';
        });
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length > 1) {
            firstPlus.style.display = 'block';
            incomeItem[1].parentNode.removeChild(incomeItem[1]);
            if (incomeItem[2]) {
                incomeItem[2].parentNode.removeChild(incomeItem[2]);
            }
        }
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1) {
            secondPlus.style.display = 'block';
            expensesItems[1].parentNode.removeChild(expensesItems[1]);
            if (expensesItems[2]) {
                expensesItems[2].parentNode.removeChild(expensesItems[2]);
            }
        }
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        depositCheck.checked = false;
        periodSelect.value = 1;
        this.getPeriod();

        calculateBtn.style.display = 'block';
        resetBtn.style.display = 'none';
        firstPlus.disabled = false;
        secondPlus.disabled = false;
    }
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

resetBtn.addEventListener('click', function(){
    appData.reset();
});

