'use strict'

import {_fn_budgetForm as fn_bf, _fn_expenseForm as fn_ef, _fn_expenseList as fn_el} from './functions.js'

// Function Excute All Actions
let eventListenters = () => {

    const budgetForm  = document.getElementById("budget-form")
    const expenseForm = document.getElementById("expense-form")
    const expenseList = document.getElementById("expense-list")

    // Budget Form Submit
    budgetForm.addEventListener('submit', fn_bf);

    // Expense Form Submit
    expenseForm.addEventListener('submit', fn_ef)

    // Expense List Submit
    expenseList.addEventListener('click', fn_el)
}

// Run All actions in Function eventListenters()
document.addEventListener('DOMContentLoaded', (event) => {
    eventListenters()
});
