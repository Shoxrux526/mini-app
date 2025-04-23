const tg = window.Telegram.WebApp;

tg.ready();

// Botdan kelgan ma'lumotlarni olish
console.log("Telegram Web App initialized:", tg.initDataUnsafe); // Debugging uchun

let subscriptionData = {};
try {
    const rawStartParam = tg.initDataUnsafe.start_param || "{}";
    console.log("Raw start_param:", rawStartParam); // Debugging uchun
    subscriptionData = JSON.parse(rawStartParam);
    console.log("Parsed subscriptionData:", subscriptionData); // Debugging uchun
} catch (e) {
    console.error("Failed to parse start_param:", e);
    subscriptionData = {};
}

// Ma'lumotlarni olish va standart qiymatlar
const endDate = subscriptionData.end_date || "Hali obuna yo‘q";
const daysLeft = subscriptionData.days_left !== undefined ? subscriptionData.days_left : 0;
const progress = subscriptionData.progress !== undefined ? subscriptionData.progress : 0;

// Elementlarni yangilash
console.log("Updating UI with:", { endDate, daysLeft, progress }); // Debugging uchun
document.getElementById("end-date").textContent = endDate;
document.getElementById("days-left").textContent = daysLeft;
document.getElementById("progress-percent").textContent = progress;
document.getElementById("progress-bar").style.width = `${progress}%`;

// "Obuna bo‘lish" tugmasi
document.getElementById("subscribe-btn").addEventListener("click", () => {
    tg.sendData(JSON.stringify({ action: "subscribe" }));
    tg.close();
});
