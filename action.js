/* -----------------------------------
   データ読み込み
----------------------------------- */
let status = JSON.parse(localStorage.getItem("status"));
let character = JSON.parse(localStorage.getItem("character"));
let outfits = JSON.parse(localStorage.getItem("outfits")) || ["default"];
let currentOutfit = localStorage.getItem("currentOutfit") || "default";
let livingItems = JSON.parse(localStorage.getItem("livingItems")) || [];
let roomTheme = localStorage.getItem("roomTheme") || "default";

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
   アクション終了処理
----------------------------------- */
function finishAction(type) {
  switch(type) {
    case "eat":
      status.hunger = Math.min(100, status.hunger + 40);
      addXP(5);
      break;

    case "sleep":
      status.sleep = Math.min(100, status.sleep + 60);
      addXP(5);
      break;

    case "bath":
      status.clean = Math.min(100, status.clean + 50);
      status.happy = Math.min(100, status.happy + 10);
      addXP(5);
      break;

    case "toilet":
      status.clean = Math.min(100, status.clean + 10);
      status.happy = Math.min(100, status.happy + 5);
      addXP(3);
      break;

    case "change":
      status.clean = Math.min(100, status.clean + 5);
      status.happy = Math.min(100, status.happy + 10);
      addXP(3);
      break;

    case "play":
      status.happy = Math.min(100, status.happy + 20);
      addXP(4);
      break;

    case "study":
      status.intelligence += 15;
      status.happy = Math.max(0, status.happy - 5);
      addXP(8);
      break;
  }

  localStorage.setItem("status", JSON.stringify(status));
  window.location.href = "index.html";
}

/* -----------------------------------
   XP加算 & レベルアップ判定
----------------------------------- */
function addXP(amount) {
  character.xp += amount;

  const levelTable = [
    { level: 1, needXP: 0, reward: null },
    { level: 2, needXP: 50, reward: "expression" },
    { level: 3, needXP: 80, reward: "outfit1" },
    { level: 4, needXP: 120, reward: "smallItems" },
    { level: 5, needXP: 160, reward: "wallDecor" },
    { level: 6, needXP: 200, reward: "hairAccessory" },
    { level: 7, needXP: 250, reward: "furnitureUpgrade" },
    { level: 8, needXP: 300, reward: "outfit2" },
    { level: 9, needXP: 350, reward: "roomTheme" },
    { level: 10, needXP: 400, reward: "allThemes" }
  ];

  const next = levelTable.find(l => l.level === character.level + 1);

  if (next && character.xp >= next.needXP) {
    character.level++;
    unlockReward(next.reward);
    showLevelUpPopup(character.level);
  }

  localStorage.setItem("character", JSON.stringify(character));
}

/* -----------------------------------
   レベルアップ報酬
----------------------------------- */
function unlockReward(reward) {
  switch(reward) {
    case "outfit1":
      outfits.push("outfit1");
      break;

    case "outfit2":
      outfits.push("outfit2");
      break;

    case "smallItems":
      livingItems.push("cushion");
      break;

    case "wallDecor":
      livingItems.push("wall_art");
      break;

    case "furnitureUpgrade":
      livingItems.push("sofa_upgrade");
      break;

    case "roomTheme":
      roomTheme = "pastel";
      break;

    case "allThemes":
      roomTheme = "pastel";
      break;
  }

  localStorage.setItem("outfits", JSON.stringify(outfits));
  localStorage.setItem("livingItems", JSON.stringify(livingItems));
  localStorage.setItem("roomTheme", roomTheme);
}

/* -----------------------------------
   レベルアップポップアップ
----------------------------------- */
function showLevelUpPopup(level) {
  const div = document.createElement("div");
  div.className = "levelup-popup";
  div.textContent = `レベル ${level} にアップ！`;
  document.body.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}

/* -----------------------------------
   着替え画面：服一覧表示
----------------------------------- */
function renderOutfits() {
  const list = document.getElementById("outfit-list");
  if (!list) return;

  list.innerHTML = "";

  outfits.forEach(o => {
    const div = document.createElement("div");
    div.className = "outfit-item";

    const img = document.createElement("img");
    img.src = `${o}.png`;

    const btn = document.createElement("button");
    btn.textContent = "着替える";
    btn.onclick = () => changeOutfit(o);

    div.appendChild(img);
    div.appendChild(btn);
    list.appendChild(div);
  });
}

/* -----------------------------------
   着替え処理
----------------------------------- */
function changeOutfit(name) {
  currentOutfit = name;
  localStorage.setItem("currentOutfit", name);

  const char = document.querySelector(".char");
  char.style.animation = "none";
  char.offsetHeight;
  char.style.animation = "spin 0.6s ease";

  setTimeout(() => {
    char.src = `${name}.png`;
  }, 300);
}

/* 回転アニメーション */
const style = document.createElement("style");
style.textContent = `
@keyframes spin {
  0% { transform: translateX(-50%) rotateY(0deg); }
  100% { transform: translateX(-50%) rotateY(360deg); }
}`;
document.head.appendChild(style);

/* -----------------------------------
   初期化
----------------------------------- */
updateBars();
renderOutfits();
