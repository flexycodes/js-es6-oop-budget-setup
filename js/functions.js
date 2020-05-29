'use strict'

//Import class UI
import {UI} from './class-ui.js'

// new instance of UI Class
let ui = new UI()

// Function to submit Budget Form
let _fn_budgetForm = (event) => {
    event.preventDefault()
    ui.submitBudgetForm()
}

// Function to submit Expense Form
let _fn_expenseForm = (event) => {
    event.preventDefault()
    ui.submitExpenseForm()
}

// Function to submit Expense List
let _fn_expenseList = (event) => {
    event.preventDefault()

    if( event.target.parentElement.classList.contains('edit-icon') ){
        ui.editExpense(event.target.parentElement)
    }
    else if( event.target.parentElement.classList.contains('delete-icon') ){
        ui.deleteExpense(event.target.parentElement)
    }
}

// Export all functions
export {_fn_budgetForm, _fn_expenseForm, _fn_expenseList}