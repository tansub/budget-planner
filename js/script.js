import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

const totalAmount = document.getElementById("total-amount");
const userAmount = document.getElementById("user-amount");
const categorySelect = document.getElementById("category-select");
const checkAmountButton = document.getElementById("check-amount");
const updateButton = document.getElementById("change-expense");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;
let totalExpenses = 0;

// BUDGET

// Set Budget Function
totalAmountButton.addEventListener("click", async () => {
  tempAmount = parseInt(totalAmount.value);
  if (isNaN(tempAmount) || tempAmount <= 0) {
    alert("Please enter a valid total amount.");
    return;
  }

  try {
    await setDoc(doc(db, "budget", "current"), {
      totalBudget: tempAmount,
      currentBalance: tempAmount - (await fetchTotalExpenses()),
    });

    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - totalExpenses;
    totalAmount.value = "";
  } catch (error) {
    console.error("Error saving budget to Firestore:", error);
  }
});
export const fetchBudget = async () => {
  try {
    const budgetDoc = await getDoc(doc(db, "budget", "current"));
    if (budgetDoc.exists()) {
      const data = budgetDoc.data();
      amount.innerHTML = data.totalBudget;
      balanceValue.innerText = data.currentBalance;
      expenditureValue.innerText = data.totalExpenses;
      tempAmount = data.totalBudget;
    }
  } catch (error) {
    console.error("Error fetching budget from Firestore:", error);
  }
};

// Disable edit and delete buttons
const disableButtons = (bool) => {
  document
    .querySelectorAll(".edit")
    .forEach((button) => (button.disabled = bool));
};

// EXPENSES

export const fetchTotalExpenses = async () => {
  try {
    const q = query(collection(db, "expenses"));
    const querySnapshot = await getDocs(q);
    let newTotalExpenses = 0;

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const expenseAmount = parseFloat(data.amount);
      if (!isNaN(expenseAmount)) {
        newTotalExpenses += expenseAmount;
      }
    });

    totalExpenses = newTotalExpenses;
    expenditureValue.innerHTML = totalExpenses;
    balanceValue.innerText = tempAmount - totalExpenses;
    return totalExpenses;
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    totalExpenses = 0;
    expenditureValue.innerText = totalExpenses;
    balanceValue.innerText = tempAmount;
    return 0;
  }
};

export const fetchExpenses = async () => {
  try {
    const q = query(collection(db, "expenses"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    list.innerHTML = "";
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      listCreator(
        docSnap.id,
        data.title,
        data.amount,
        data.category || "Uncategorized"
      );
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};

const listCreator = (id, expenseName, expenseValue, expenseCategory) => {
  let subListContent = document.createElement("div");
  subListContent.classList.add("sublist-content", "flex-space");
  subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p><p class="category">${expenseCategory}</p>`;

  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.setAttribute("aria-label", "Edit expense");
  editButton.addEventListener("click", () => {
    // deleteExpense(id)
    editExpense(id, expenseName, expenseValue, expenseCategory);
  });

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  editButton.setAttribute("aria-label", "Delete expense");
  deleteButton.addEventListener("click", () => deleteExpense(id));

  subListContent.append(editButton, deleteButton);
  list.appendChild(subListContent);
};

checkAmountButton.addEventListener("click", async () => {
  if (!userAmount.value || !productTitle.value) {
    alert("Please fill in the details.");
    return;
  }

  disableButtons(false);
  let expenditure = parseInt(userAmount.value);
  let totalExpenses = (await fetchTotalExpenses()) + expenditure;
  balanceValue.innerText = tempAmount - totalExpenses;
  expenditureValue.innerText = totalExpenses;
  listCreator(productTitle.value, userAmount.value, categorySelect.value);
  await addExpenseToFirestore(
    productTitle.value,
    expenditure,
    categorySelect.value
  );
  productTitle.value = "";
  userAmount.value = "";
  categorySelect.value = "";
});

const addExpenseToFirestore = async (title, amount, category) => {
  try {
    if (isNaN(amount) || amount <= 0) {
      console.error("Invalid amount:", amount);
      alert("Please enter a valid expense amount.");
      return;
    }

    const docRef = await addDoc(collection(db, "expenses"), {
      title,
      amount,
      category: category || "Uncategorized",
      createdAt: new Date().toISOString(),
    });

    await updateDoc(doc(db, "expenses", docRef.id), { id: docRef.id });
    await fetchExpenses();
    await fetchTotalExpenses();
  } catch (error) {
    console.error("Error adding expense to Firestore:", error);
  }
};

const editExpense = async (id, title, amount, category) => {
  updateButton.style.display = "inline";
  productTitle.value = title;
  userAmount.value = amount;
  categorySelect.value = category || "Uncategorized";

  checkAmountButton.disabled = true;

  updateButton.addEventListener("click", async () => {
    try {
      await updateDoc(doc(db, "expenses", id), {
        title: productTitle.value,
        amount: parseFloat(userAmount.value),
        category: categorySelect.value || "Uncategorized",
      });

      await fetchExpenses();
      await fetchTotalExpenses();
      updateButton.style.display = "none";
      checkAmountButton.disabled = false;
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  });
};

const deleteExpense = async (id) => {
  try {
    await deleteDoc(doc(db, "expenses", id));
    await fetchTotalExpenses();
    await fetchExpenses();
    // await fetchBudget();
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  await fetchBudget();
  await fetchExpenses();
  await fetchTotalExpenses();
});
