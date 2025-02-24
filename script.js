let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
let categorySelect = document.getElementById('category-select');
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Set Budget Function
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    if (tempAmount === "" || tempAmount < 0) {
        alert('Please enter a valid total amount.');
    } else {
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        totalAmount.value = "";
    }
});

// Disable edit and delete buttons
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

// Modify list elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        productTitle.value = parentDiv.querySelector(".product").innerText;
        userAmount.value = parentAmount;
        categorySelect.value = parentDiv.querySelector(".category").innerText;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

// Create expense list item
const listCreator = (expenseName, expenseValue, expenseCategory) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p><p class="category">${expenseCategory}</p>`;
    
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => modifyElement(editButton, true));

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => modifyElement(deleteButton));

    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);

    list.appendChild(subListContent);
};

// Add Expense Function
checkAmountButton.addEventListener("click", () => {
    if (!userAmount.value || !productTitle.value || !categorySelect.value) {
        productTitleError.classList.remove("hide");
        return;
    }

    disableButtons(false);

    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;

    balanceValue.innerText = tempAmount - sum;

    listCreator(productTitle.value, userAmount.value, categorySelect.value);

    productTitle.value = "";
    userAmount.value = "";
    categorySelect.value = "";
});
