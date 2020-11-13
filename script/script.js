'use strict';

const isNumber = function(n){
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
    resetBtn = document.querySelector('#cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

class AppData {
    constructor() {
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
    }

    start () {
        this.budget = Number(salaryAmount.value);
        this.getInfoDeposit();
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        calculateBtn.style.display = 'none';
        resetBtn.style.display = 'block';
        const allInputs = document.querySelectorAll('input[type=text]');
        allInputs.forEach((item)=>{
            item.disabled = true;
        });
        firstPlus.disabled = true;
        secondPlus.disabled = true;
    }
    showResult (){
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = _this.calcPeriod();
        });
    }
    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            secondPlus.style.display = 'none';
        }
    }
    getExpenses(){
        expensesItems.forEach((item)=>{
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    addIncomeBlock() {
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, firstPlus);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            firstPlus.style.display = 'none';
        }
    }
    getIncome() {
        incomeItem.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
        for (const key in this.income) {
            this.incomeMonth += Number(this.income[key]);
        }
    }
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => { 
            item =  item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth(){
        for (const key in this.expenses) {
            this.expensesMonth += Number(this.expenses[key]);
        }
        return this.expensesMonth;
    }
    getBudget(){ 
        const monthDeposit = this.moneyDeposit * this.percentDeposit;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    }
    getTargetMonth(){
        let result = 0;
        result = Math.ceil(targetAmount.value/this.budgetMonth);
        if (result < 0) {
            return ('Цель не будет достигнута');
        }
        return result;
    }
    getStatusIncome(){
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
    }
    getInfoDeposit(){
        if(this.deposit){
            let a = depositPercent.value;
            if (depositBank.value === 'other') {
                a = depositPercent.value / 100;
            }
            this.percentDeposit = a;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcPeriod(){
        return this.budgetMonth * periodSelect.value;
    }
    getPeriod() {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
    }
    reset(){
        const allInputs = document.querySelectorAll('input[type=text]');
        allInputs.forEach((item) => {
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

        const appDataReset = new AppData();
        Object.assign(appData, appDataReset);
        
        periodSelect.value = 1;
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
        calculateBtn.style.display = 'block';
        resetBtn.style.display = 'none';
        firstPlus.disabled = false;
        secondPlus.disabled = false;

 
        depositCheck.checked = false;
        depositBank.value = 0;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            depositPercent.value = '';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.disabled = true;
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = 0;
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventsListeners() {
        calculateBtn.addEventListener('click', (event) => {
        if (salaryAmount.value === '') {
            event.preventDefault();
            return;
        }
        if (depositPercent.value === '') {
            event.preventDefault();
            alert ("Введите корректное значение в поле проценты");
            return;
        }
        this.start();
        });
        secondPlus.addEventListener('click', this.addExpensesBlock);
        firstPlus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.getPeriod);
        resetBtn.addEventListener('click', this.reset);

        depositCheck.addEventListener('change', this.depositHandler.bind(this));

        const checkAmount = () => {
            if (this.deposit) {
                if (!isNumber(depositAmount.value) || depositAmount.value === '') {
                    depositAmount.value = '';
                    calculateBtn.disabled = true;
                } else {
                    calculateBtn.disabled = false;
                }
            }
        };
        depositAmount.addEventListener('input', checkAmount);
        checkAmount();


        const checkPercent = () => {
            if (depositBank.value === 'other') {
                if (!isNumber(depositPercent.value) || depositPercent.value <= 0 || depositPercent.value > 100) {
                    calculateBtn.disabled = true;
                    depositPercent.value = '';
                    alert ("Введите корректное значение в поле проценты");
                } else {
                    calculateBtn.disabled = false;
                }
            }
        };
        depositPercent.addEventListener('input', checkPercent);
        checkPercent();
    }
}


const appData = new AppData();
appData.eventsListeners();




