// Конфигурация NFT
const nfts = [
    { id: 1, name: "Sticker", icon: "🎈", price: 40, rarity: "common", chance: 70 },
    { id: 2, name: "TON Coin", icon: "💎", price: 200, rarity: "rare", chance: 25 },
    { id: 3, name: "Durov", icon: "👨‍💻", price: 1500, rarity: "legendary", chance: 5 }
];

let balance = parseInt(localStorage.getItem('stars')) || 500;
let myItems = JSON.parse(localStorage.getItem('inventory')) || [];

// Инициализация
updateUI();
renderInventory();

function updateUI() {
    document.getElementById('star-balance').innerText = balance;
    localStorage.setItem('stars', balance);
    localStorage.setItem('inventory', JSON.stringify(myItems));
}

function fakeBuy() {
    balance += 1000;
    updateUI();
}

function startSpin() {
    if (balance < 100) return alert("Мало звёзд!");
    balance -= 100;
    updateUI();

    const tape = document.getElementById('tape');
    tape.innerHTML = '';
    
    // Генерируем 60 карточек для прокрутки
    for (let i = 0; i < 60; i++) {
        const item = nfts[Math.floor(Math.random() * nfts.length)];
        const el = document.createElement('div');
        el.className = `card ${item.rarity}`;
        el.innerHTML = `<span>${item.icon}</span><small>${item.name}</small>`;
        tape.appendChild(el);
    }

    const cardWidth = 140; 
    const winnerIndex = 55; // На каком остановимся
    const stopAt = (winnerIndex * cardWidth) - (window.innerWidth / 2) + (cardWidth / 2);

    tape.style.transition = "none";
    tape.style.transform = "translateX(0)";

    setTimeout(() => {
        tape.style.transition = "transform 5s cubic-bezier(0.1, 0, 0.1, 1)";
        tape.style.transform = `translateX(-${stopAt}px)`;
    }, 50);

    // Выдача приза через 5 сек
    setTimeout(() => {
        const win = nfts[Math.floor(Math.random() * nfts.length)];
        myItems.push(win);
        renderInventory();
        updateUI();
    }, 5100);
}

function renderInventory() {
    const inv = document.getElementById('inventory');
    inv.innerHTML = '';
    myItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `card ${item.rarity}`;
        div.style.width = "100px";
        div.style.height = "100px";
        div.innerHTML = `<span>${item.icon}</span><button onclick="sell(${index}, ${item.price})">SELL</button>`;
        inv.appendChild(div);
    });
}

function sell(index, price) {
    balance += price;
    myItems.splice(index, 1);
    renderInventory();
    updateUI();
}
