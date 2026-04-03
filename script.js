function startSpin() {
    if (balance < 100) return alert("Мало звёзд!");
    
    // 1. Сначала определяем ПРИЗ (логика)
    // Генерируем случайное число от 1 до 100 для шансов
    const randomNum = Math.floor(Math.random() * 100) + 1;
    let win;
    if (randomNum <= 5) win = nfts.find(n => n.rarity === 'legendary'); // 5% шанс
    else if (randomNum <= 30) win = nfts.find(n => n.rarity === 'rare'); // 25% шанс
    else win = nfts.find(n => n.rarity === 'common'); // Остальное - обычные

    balance -= 100;
    updateUI();

    const tape = document.getElementById('tape');
    tape.innerHTML = '';
    
    const cardWidth = 140; 
    const winnerIndex = 55; // На этом месте в ленте будет наш реальный приз

    // 2. Генерируем ленту (визуал)
    for (let i = 0; i < 65; i++) {
        let item;
        if (i === winnerIndex) {
            item = win; // ПОДМЕНЯЕМ 55-ю карточку на наш заранее выбранный приз
        } else {
            item = nfts[Math.floor(Math.random() * nfts.length)];
        }
        
        const el = document.createElement('div');
        el.className = `card ${item.rarity}`;
        el.innerHTML = `<span>${item.icon}</span><small>${item.name}</small>`;
        tape.appendChild(el);
    }

    const stopAt = (winnerIndex * cardWidth) - (window.innerWidth / 2) + (cardWidth / 2);

    // 3. Запускаем кручение
    tape.style.transition = "none";
    tape.style.transform = "translateX(0)";

    setTimeout(() => {
        tape.style.transition = "transform 5s cubic-bezier(0.1, 0, 0.1, 1)";
        tape.style.transform = `translateX(-${stopAt}px)`;
    }, 50);

    // 4. Добавляем в инвентарь ИМЕННО тот предмет, который подложили в ленту
    setTimeout(() => {
        myItems.push(win); // Теперь тут всегда тот же предмет, что и в рулетке
        renderInventory();
        updateUI();
        document.getElementById('spin-button').disabled = false;
    }, 5100);
}
