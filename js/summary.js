import { db } from "./firebase.js";
import {
  getDocs,
  collection,
} from "firebase/firestore";

async function fetchExpenses() {
  const expensesCollection = collection(db, "expenses"); 
  const expensesSnapshot = await getDocs(expensesCollection);

  let expenses = [];
  expensesSnapshot.forEach((doc) => {
    expenses.push(doc.data());
  });

  return expenses;
}

async function updateMonthlySpending() {
  let expenses = await fetchExpenses();
  let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById("monthly-spending").textContent = total.toFixed(2);
}

async function updateCategoryChart() {
  let expenses = await fetchExpenses();

  let categoryTotals = {};
  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  let categories = Object.keys(categoryTotals);
  let amounts = Object.values(categoryTotals);

  let ctx = document.getElementById("categoryChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",

    data: {
      labels: categories,
      datasets: [
        {
          label: "Spending by Category",
          data: amounts,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        },
      ],
    },
  });
}

async function populateExpenseTable() {
  let expenses = await fetchExpenses();
  let tableBody = document.getElementById("expense-table");
  tableBody.innerHTML = "";

  expenses.forEach((expense) => {
    let expenseDate = expense.createdAt ? new Date(expense.createdAt) : null;
    let formattedDate = expenseDate
      ? expenseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "No Date";

    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${expense.title || "Unknown"}</td>
            <td>${expense.category || "Uncategorized"}</td>
            <td>$${parseFloat(expense.amount || 0).toFixed(2)}</td>
            <td>${formattedDate}</td>
        `;
    tableBody.appendChild(row);
  });
}

updateMonthlySpending();
updateCategoryChart();
populateExpenseTable();
