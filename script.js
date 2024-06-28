
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money_plus');
const money_minus = document.getElementById('money_minus');
let list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');



let transactions = []
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
if (localStorageTransactions != null) {
    transactions = localStorageTransactions
}





// add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {

        alert("Please Enter Text and Value")

    } else {
        const elem = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(elem);

        addTransactionDOM(elem);
        updateLocalStorage();
        updateValues();
    
    }
}
// generated id
function generateID() {
    return Math.floor(Math.random() * 1000000000);
}


function addTransactionDOM(elem) {
    let sign = ""
    if (elem["amount"] < 0) {
        sign = "-";
    }
    else {
        sign = "+"
    }
    const item = document.createElement("li");

    if (sign == "-") {
        item.classList.add("money_minus");
    }
    else if (sign == "+") {
        item.classList.add("money_plus");
    }


    item.innerHTML = `
    ${elem.text}<span>${sign}${Math.abs(elem.amount)}</span>
    <button class = "del_btn" onclick=" removeTransaction(${elem.id}) "> X </button>
    `;
    list.appendChild(item)

}


function removeTransaction(id) {
  
    let new_transactions = []
    transactions.map((elem) => {
        if (elem.id != id) {
            new_transactions.push(elem)
        }
    })
    transactions = new_transactions

    updateLocalStorage();
    Init();
}

// update value
function updateValues() {
    let amounts = []
    transactions.forEach((e) => {
        amounts.push(e.amount)
    })

    let total = 0
    let income = 0
    let expense = 0
    amounts.forEach((e) => {
        total = total + parseInt(e);
        if (e < 0) expense += e;
        else income += e
    })

   
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

// update local storage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions)
    );
}

// Init app

function Init() {
    list.innerHTML = "";
    transactions.forEach((elem) => {
        console.log(transactions)
        addTransactionDOM(elem)
    });
    updateValues();

}


Init();

let submit = document.getElementById("submit")
submit.addEventListener('click', (e) => {
    addTransaction(e)
})

