const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];
const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));


let transactions = localStorage.getItem("transactions")!==null ? localStorageTransaction : [];

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = ` 
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">X</button>   
    `;

  list.appendChild(item);
}

// Add transaction
function addTransaction(e){
  e.preventDefault();

  if(text.value.trim()==="" || amount.value===""){
    alert("Please add a text and amount");
  }else{
    const transaction = {
      id:randomID(),
      text: text.value,
      amount: +amount.value
    }

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value ="";
    amount.value ="";
  }

}

// Random ID
function randomID(){
  return Math.floor(Math.random()*100000000);
}

// Update the baalance, income and expense
function updateValues(){
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);

  const imcome = amounts.filter(item => item > 0).reduce((acc,item)=> (acc+=item),0 ).toFixed(2);

  const expense = (amounts.filter(item => item < 0).reduce((acc,item)=> (acc+=item),0 )*-1).toFixed(2);

  console.log(amounts);
  money_minus.innerText = `$${expense}`;
  money_plus.innerText = `$${imcome}`;
  balance.innerText = `$${total}`;
}

// Remove transaction by ID
function removeTransaction(id){

  transactions = transactions.filter(transaction => transaction.id !== id);


  updateLocalStorage();
  init();

}

// Update local storage transaction
function updateLocalStorage(){
  localStorage.setItem("transactions", JSON.stringify(transactions))
}


// Inin app
function init() {
  list.innerHTML ="";
  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
