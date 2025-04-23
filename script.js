const tg = window.Telegram.WebApp;

tg.ready();

// Botdan kelgan ma'lumotlarni olish
console.log("Telegram Web App initialized:", tg.initDataUnsafe);

let subscriptionData = {};
async function fetchSubscriptionData(userId) {
    try {
        const response = await fetch(`http://localhost:8080/subscription?user_id=${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch subscription data");
        }
        subscriptionData = await response.json();
        console.log("Fetched subscriptionData:", subscriptionData);
    } catch (e) {
        console.error("Error fetching subscription data:", e);
        subscriptionData = {};
    }
}

// Foydalanuvchi ID'sini olish
const userId = tg.initDataUnsafe.start_param || tg.initDataUnsafe.user?.id || "";
console.log("User ID:", userId);

// Ma'lumotlarni olish
if (userId) {
    await fetchSubscriptionData(userId);
}

// Ma'lumotlarni ko'rsatish
const endDate = subscriptionData.end_date || "Hali obuna yo‘q";
const daysLeft = subscriptionData.days_left !== undefined ? subscriptionData.days_left : 0;
const progress = subscriptionData.progress !== undefined ? subscriptionData.progress : 0;

// Elementlarni yangilash
console.log("Updating UI with:", { endDate, daysLeft, progress });
document.getElementById("end-date").textContent = endDate;
document.getElementById("days-left").textContent = daysLeft;
document.getElementById("progress-percent").textContent = progress;
document.getElementById("progress-bar").style.width = `${progress}%`;

// "Obuna bo‘lish" tugmasi
document.getElementById("subscribe-btn").addEventListener("click", () => {
    tg.sendData(JSON.stringify({ action: "subscribe" }));
    tg.close();
});
