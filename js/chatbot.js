import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { fetchBudget } from "./script";
import { fetchExpenses } from "./script";
import { fetchTotalExpenses } from "./script";

let apiKey = null;
let genAI = null;
let model = null;

async function getApiKey() {
  try {
    let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
    if (snapshot.exists()) {
      apiKey = snapshot.data().key;
      genAI = new GoogleGenerativeAI(apiKey);
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } else {
      console.error("error");
    }
  } catch (error) {
    console.error("Error fetching API Key:", error);
  }
}

async function askChatBot(request) {
  try {
    if (!model) {
      console.error("AI not initialized.");
    }

    const lowerRequest = request.toLowerCase();
    if (lowerRequest.startsWith("add expense")) {
      return await addExpense(lowerRequest);
    } else if (lowerRequest.startsWith("set budget")) {
      return await setBudget(lowerRequest);
    }

    const result = await model.generateContent(request);
    const responseText = result.response.text();
    return (
      responseText || "I'm not sure about that. Try asking something else."
    );
  } catch (error) {
    console.error("Error fetching AI:", error);
  }
}

// Add Expense
async function addExpense(message) {
  try {
    const regex = /add expense (\d+(\.\d{1,2})?) for (.+) in (.+)/;
    const match = message.match(regex);
    if (!match)
      return "Invalid format! Use: 'Add expense [amount] for [item] in [category]'";

    const amount = parseFloat(match[1]);
    const title = match[3].trim();
    const category = match[4].trim();

    await addDoc(collection(db, "expenses"), {
      title,
      amount,
      category,
      createdAt: new Date().toISOString(),
    });
    fetchExpenses();
    fetchTotalExpenses();
    return `Expense added: ${title} - $${amount} in ${category}`;
  } catch (error) {
    console.error("Error adding expense:", error);
    return "Failed to add expense. Try again.";
  }
}

// Set Budget
async function setBudget(message) {
  try {
    const regex = /set budget (\d+(\.\d{1,2})?)/;
    const match = message.match(regex);
    if (!match) return "Invalid format! Use: 'Set budget [amount]'";

    const budget = parseFloat(match[1]);

    const budgetDoc = doc(db, "budget", "current");
    await updateDoc(budgetDoc, { totalBudget: budget });

    fetchBudget();

    return `Budget set to $${budget}`;
  } catch (error) {
    console.error("Error setting budget:", error);
    return "Failed to set budget. Try again.";
  }
}

function listenForExpenseChanges() {
  onSnapshot(collection(db, "expenses"), (snapshot) => {
    let expenses = [];
    snapshot.forEach((doc) => expenses.push(doc.data()));
    updateExpensesUI(expenses);
  });
}

function listenForBudgetChanges() {
  onSnapshot(doc(db, "settings", "budget"), (snapshot) => {
    if (snapshot.exists()) {
      const budget = snapshot.data().totalBudget;
      updateBudgetUI(budget);
    }
  });
}

function updateExpensesUI(expenses) {
  let expenseTable = document.getElementById("expense-table");
  if (!expenseTable) return;

  expenseTable.innerHTML = "";
  expenses.forEach((expense) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.category}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${new Date(expense.createdAt).toLocaleDateString()}</td>
        `;
    expenseTable.appendChild(row);
  });
}

function updateBudgetUI(budget) {
  let budgetDisplay = document.getElementById("monthly-spending");
  if (budgetDisplay) {
    budgetDisplay.textContent = `$${budget.toFixed(2)}`;
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await getApiKey();
  listenForExpenseChanges();
  listenForBudgetChanges();

  const chatContainer = document.getElementById("chatbot-container");
  const chatHistory = document.getElementById("chat-history");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const hideChatbotBtn = document.getElementById("hide-chatbot");
  const showChatbotBtn = document.getElementById("show-chatbot");

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    appendMessage("You", userMessage);
    chatInput.value = "";

    const response = await askChatBot(userMessage);
    appendMessage("Bot", response);
  }

  function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  hideChatbotBtn.addEventListener("click", function () {
    chatContainer.style.display = "none";
    showChatbotBtn.style.display = "block";
  });

  showChatbotBtn.addEventListener("click", function () {
    chatContainer.style.display = "block";
    showChatbotBtn.style.display = "none";
  });
});
