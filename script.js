function setGuestName() {
    // 1. Получаем параметры из URL (все, что после знака ?)
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. Ищем параметр с названием 'name'
    const guestName = urlParams.get('name');
    
    // 3. Если имя в ссылке есть, заменяем текст в блоке #guest-name
    if (guestName) {
        // decodeURIComponent нужен, чтобы пробелы и кириллица из ссылки читались правильно
        document.getElementById('guest-name').innerText = decodeURIComponent(guestName);
    } else {
        // Если ссылки без имени (просто зашли на сайт), можно либо:
        // а) Оставить "друзья" (как в HTML)
        // б) Скрыть весь блок приветствия:
        // document.getElementById('guest-greeting').style.display = 'none';
    }
}

// Запускаем функцию при загрузке страницы
window.onload = () => {
    setGuestName();
    // тут ваши остальные функции, например updateCountdown();
};


function updateCountdown() {
    // Укажите дату вашего события: Год, Месяц (0-11), День, Часы, Минуты
    // ВНИМАНИЕ: Месяцы в JS начинаются с 0. Август — это 7.
    const weddingDate = new Date(2026, 7, 29, 12, 0, 0).getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Расчет времени
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Вывод в HTML
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Если дата наступила
    if (distance < 0) {
        clearInterval(interval);
        document.querySelector(".countdown-container").innerHTML = "<h3>Праздник начался!✨</h3>";
    }
}

// Запуск таймера каждую секунду
const interval = setInterval(updateCountdown, 1000);

// Первый запуск сразу при загрузке страницы
updateCountdown();

