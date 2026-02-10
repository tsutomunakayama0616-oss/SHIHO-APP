/* -----------------------------------
   データ読み込み
----------------------------------- */
let status = JSON.parse(localStorage.getItem("status")) || {
  hunger: 100,
  sleep: 100,
  clean: 100,
  happy: 100,
  intelligence: 0
};

let character = JSON.parse(localStorage.getItem("character")) || {
  level: 1,
  xp: 0
};

let outfits = JSON.parse(localStorage.getItem("outfits")) || ["default"];
let currentOutfit = localStorage.getItem("currentOutfit") || "default";

let livingItems = JSON.parse(localStorage.getItem("livingItems")) || [];
let roomTheme = localStorage.getItem("roomTheme") || "default";

const decayRate = {
  hunger: 5,
  sleep: 3,
  clean: 2,
  happy: 2
};

/* -----------------------------------
   ステータスバー更新
----------------------------------- */
function updateBars() {
  document.getElementById("bar-hunger").style.setProperty("--value", status.hunger + "%");
  document.getElementById("bar-sleep").style.setProperty("--value", status.sleep + "%");
  document.getElementById("bar-clean").style.setProperty("--value", status.clean + "%");
  document.getElementById("bar-happy").style.setProperty("--value", status.happy + "%");
}

/* -----------------------------------
   アクション画面へ遷移
----------------------------------- */
function goAction(type) {
  window.location.href = `action_${type}.html`;
}

/* -----------------------------------
   朝／夜切り替え
----------------------------------- */
function updateDayNight() {
  const hour = new Date().getHours();
  const body = document.body;

  if (hour >= 6 && hour < 18) {
    body.classList.remove("night");
  } else {
    body.classList.add("night");
  }
}

/* -----------------------------------
   テーマ適用
----------------------------------- */
function applyTheme() {
  const bg = document.getElementById("room-bg");

  if (roomTheme === "pastel") {
    bg.src = "living_pastel.webp";
  } else {
    bg.src = "living_base.webp";
  }
}

/* -----------------------------------
   家具表示
----------------------------------- */
function renderLivingItems() {
  const room = document.querySelector(".room");

  livingItems.forEach(item => {
    const img = document.createElement("img");
    img.src = `${item}.png`;  // 例：cushion.png
    img.className = "room-item";
    room.appendChild(img);
  });
}

/* -----------------------------------
   着替え反映
----------------------------------- */
function applyOutfit() {
  const char = document.getElementById("character");

  // ホーム画面は outfit を使わず char_idle.png を表示
  if (window.location.pathname.includes("index.html")) {
    char.src = "char_idle.png";
    return;
  }

  // アクション画面では outfit を適用
  char.src = `${currentOutfit}.png`;
}

/* -----------------------------------
   時間経過のステータス減少
----------------------------------- */
function applyTimeDecay() {
  const last = localStorage.getItem("lastLogin");
  if (!last) return;

  const now = Date.now();
  const diffHours = Math.floor((now - last) / (1000 * 60 * 60));

  if (diffHours <= 0) return;

  status.hunger = Math.max(0, status.hunger - decayRate.hunger * diffHours);
  status.sleep  = Math.max(0, status.sleep  - decayRate.sleep  * diffHours);
  status.clean  = Math.max(0, status.clean  - decayRate.clean  * diffHours);
  status.happy  = Math.max(0, status.happy  - decayRate.happy * diffHours);

  localStorage.setItem("status", JSON.stringify(status));
}

/* -----------------------------------
   最終ログイン保存
----------------------------------- */
function saveLastLogin() {
  localStorage.setItem("lastLogin", Date.now());
}

/* -----------------------------------
   初期化（ホーム画面読み込み時）
----------------------------------- */
applyTimeDecay();
updateBars();
updateDayNight();
applyTheme();
renderLivingItems();
applyOutfit();
saveLastLogin();
