const tg = window.Telegram.WebApp;

tg.ready();

// Botdan kelgan ma'lumotlarni olish
const userData = tg.initDataUnsafe.user || {};
let subscriptionData;
try {
    subscriptionData = JSON.parse(tg.initDataUnsafe.start_param || "{}");
} catch (e) {
    console.error("Failed to parse start_param:", e);
    subscriptionData = {};
}

const endDate = subscriptionData.end_date || "Hali obuna yo‘q";
const daysLeft = subscriptionData.days_left || 0;
const progress = subscriptionData.progress || 0;

// Elementlarni yangilash
document.getElementById("end-date").textContent = endDate;
document.getElementById("days-left").textContent = daysLeft;
document.getElementById("progress-percent").textContent = progress;
document.getElementById("progress-bar").style.width = `${progress}%`;

// "Obuna bo‘lish" tugmasi
document.getElementById("subscribe-btn").addEventListener("click", () => {
    tg.sendData(JSON.stringify({ action: "subscribe" }));
    tg.close();
});
