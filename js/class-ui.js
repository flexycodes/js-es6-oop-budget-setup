'use strict'

class UI 
{
  constructor() {
    this.budgetFeedback  = document.querySelector(".budget-feedback")
    this.expenseFeedback = document.querySelector(".expense-feedback")
    this.budgetForm      = document.getElementById("budget-form")
    this.budgetInput     = document.getElementById("budget-input")
    this.budgetAmount    = document.getElementById("budget-amount")
    this.expenseAmount   = document.getElementById("expense-amount")
    this.balance         = document.getElementById("balance")
    this.balanceAmount   = document.getElementById("balance-amount")
    this.expenseForm     = document.getElementById("expense-form")
    this.expenseInput    = document.getElementById("expense-input")
    this.amountInput     = document.getElementById("amount-input")
    this.expenseList     = document.getElementById("expense-list")
    this.itemList        = []
    this.itemID          = 0
  }

  // Method Submit Form Budget
  submitBudgetForm = () => {
    let _vl_budget = this.budgetInput.value

    if( (_vl_budget === '') || (_vl_budget <0) ){
      this.budgetFeedback.classList.add('showItem')
      this.budgetFeedback.innerHTML = `<p>Value cannot be empty or negative !</p>`
      
      setTimeout(() => {
        this.budgetFeedback.classList.remove('showItem')
      }, 4000)
    }
    else{
      this.budgetAmount.textContent = _vl_budget
      this.budgetInput.value = ''
      this.showBalance()
    }
  }

  // Method Show Balance
  showBalance = () => {
    const expense = this.totalExpense()
    const total   = parseInt(this.budgetAmount.textContent) - expense

    this.balanceAmount.textContent = total

    if(total < 0){
      this.balance.classList.remove('showGreen', 'showBlack')
      this.balance.classList.add('showRed')
    }
    else if(total > 0){
      this.balance.classList.remove('showRed', 'showBlack')
      this.balance.classList.add('showGreen')
    }
    else if(total === 0){
      this.balance.classList.remove('showRed', 'showGreen')
      this.balance.classList.add('showBlack')
    }
  }

  // Method Submit Form Expense
  submitExpenseForm = () => {
    const expenseValue = this.expenseInput.value
    const amountValue  = this.amountInput.value

    if( (expenseValue === '') || (amountValue === '') || (amountValue < 0) ){
      this.expenseFeedback.classList.add('showItem')
      this.expenseFeedback.innerHTML = `<p>Value cannot be empty or negative !</p>`
      
      setTimeout(() => {
        this.expenseFeedback.classList.remove('showItem')
      }, 4000)
    }
    else{
      let amount = parseInt(amountValue)

      this.expenseInput.value = ''
      this.amountInput.value  = ''

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      }

      this.itemID++
      this.itemList.push(expense)

      this.addExpense(expense)
    }
  }

  // Method Total Expense
  totalExpense = () => {
    let total = 0

    if( this.itemList.length > 0 ){
      const reducer = (amount, currentValue) => {
        amount += currentValue.amount
        return amount
      }

      total = this.itemList.reduce(reducer, 0)
    }

    this.expenseAmount.textContent = total

    return total
  }

  // Method Add Expense
  addExpense = (expense) => {
    const div = document.createElement('div')

    div.classList.add('expense')
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
    <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

    <div class="expense-icons list-item">

     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>`

    this.expenseList.appendChild(div)
    this.showBalance()
  }

  // Method Edit Expense
  editExpense = (element) => {
    let id = parseInt(element.dataset.id)
    let parent = element.parentElement.parentElement.parentElement

    // Remove from DOM
    this.expenseList.removeChild(parent)

    // Return current item
    let expense = this.itemList.filter((item) => {
      return item.id === id
    });

    // Show value in Form
    this.expenseInput.value = expense[0].title
    this.amountInput.value  = expense[0].amount

    // Remove item from List
    let templist = this.itemList.filter((item) => {
      return item.id !==  id
    })

    this.itemList = templist
    this.showBalance()
  }

  // Method Delete Expense
  deleteExpense = (element) => {
    let id = parseInt(element.dataset.id)
    let parent = element.parentElement.parentElement.parentElement

    // Remove from DOM
    this.expenseList.removeChild(parent)

    // Remove item from List
    let templist = this.itemList.filter((item) => {
      return item.id !==  id
    })

    this.itemList = templist
    this.showBalance()
  }

}

// Export Class UI
export {UI}