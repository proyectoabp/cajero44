let balance = 1000; // Saldo inicial
let currentEntry = "";
let correctNip = "1234"; // NIP correcto
let enteredNip = "";

function pressLoginKey(num) {
    let display = document.getElementById('login-display');
    enteredNip += num;
    display.innerText = "*".repeat(enteredNip.length);
}

function clearLoginEntry() {
    let display = document.getElementById('login-display');
    enteredNip = "";
    display.innerText = "Ingrese su NIP";
}

function login() {
    if (enteredNip === correctNip) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('atm-container').style.display = 'flex';
        document.getElementById('cash-display').style.display = 'none';
    } else {
        document.getElementById('login-display').innerText = "NIP incorrecto";
        enteredNip = "";
    }
}

function showBalance() {
    document.getElementById('display').innerText = `Saldo: $${balance}`;
}

function withdraw() {
    document.getElementById('display').innerText = "Ingrese el monto a retirar";
    currentEntry = "withdraw";
}

function deposit() {
    document.getElementById('display').innerText = "Ingrese el monto a depositar";
    currentEntry = "deposit";
}

function exit() {
    document.getElementById('atm-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('cash-display').style.display = 'none';
    clearLoginEntry();
    balance = 1000;
    currentEntry = "";
    enteredNip = "";
    document.getElementById('display').innerText = "Bienvenido";
}

function pressKey(num) {
    let display = document.getElementById('display');
    if (currentEntry !== "") {
        display.innerText = display.innerText.match(/\d+$/) ? display.innerText + num : num;
    }
}

function clearEntry() {
    document.getElementById('display').innerText = "";
}

function enter() {
    let display = document.getElementById('display');
    let cashDisplay = document.getElementById('cash-display');
    let amount = parseFloat(display.innerText.match(/\d+$/));
    if (isNaN(amount)) {
        display.innerText = "Ingrese un monto válido";
        return;
    }
    
    cashDisplay.innerHTML = "";
    
    if (currentEntry === "withdraw") {
        if (amount <= balance) {
            balance -= amount;
            display.innerText = `Retirado: $${amount}. Saldo disponible: $${balance}`;
            displayCash(amount);
            let message = document.createElement("div");
            message.innerText = "Tome su dinero";
            message.style.color = "white";
            message.style.textAlign = "center";
            message.style.width = "100%";
            cashDisplay.insertBefore(message, cashDisplay.firstChild);
        } else {
            display.innerText = "Saldo insuficiente";
        }
    } else if (currentEntry === "deposit") {
        balance += amount;
        display.innerText = `Depositado: $${amount}. Saldo disponible: $${balance}`;
    }
    currentEntry = "";
}

function displayCash(amount) {
    let cashDisplay = document.getElementById('cash-display');
    let bills = [500, 200, 100, 50, 20];
    let coins = [10, 5, 2, 1];
    let cashItems = [];

    for (let bill of bills) {
        while (amount >= bill) {
            let img = document.createElement("img");
            img.src = `images/${bill}.png`;
            cashItems.push(img);
            amount -= bill;
        }
    }
    for (let coin of coins) {
        while (amount >= coin) {
            let img = document.createElement("img");
            img.src = `images/${coin}.png`;
            cashItems.push(img);
            amount -= coin;
        }
    }

    let row;
    cashItems.forEach((item, index) => {
        if (index % 7 === 0) {
            row = document.createElement("div");
            row.className = "cash-row";
            cashDisplay.appendChild(row);
        }
        row.appendChild(item);
    });

    cashDisplay.style.display = 'flex';
    cashDisplay.style.flexDirection = 'column';
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        if (document.getElementById('login-container').style.display !== 'none') {
            pressLoginKey(key);
        } else if (document.getElementById('atm-container').style.display !== 'none') {
            pressKey(key);
        }
    } else if (key === "Enter") {
        if (document.getElementById('login-container').style.display !== 'none') {
            login();
        } else if (document.getElementById('atm-container').style.display !== 'none') {
            enter();
        }
    } else if (key === "Backspace") {
        if (document.getElementById('login-container').style.display !== 'none') {
            clearLoginEntry();
        } else if (document.getElementById('atm-container').style.display !== 'none') {
            clearEntry();
        }
    }
});

document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', function() {
        pressKey(this.innerText);
    });
});

document.querySelector('#login-enter').addEventListener('click', login);
document.querySelector('#login-clear').addEventListener('click', clearLoginEntry);

document.querySelector('#withdraw').addEventListener('click', withdraw);
document.querySelector('#deposit').addEventListener('click', deposit);
document.querySelector('#balance').addEventListener('click', showBalance);
document.querySelector('#exit').addEventListener('click', exit);

document.querySelector('#enter').addEventListener('click', enter);
document.querySelector('#clear').addEventListener('click', clearEntry);