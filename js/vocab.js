let vocab = JSON.parse(localStorage.getItem("vocab")) || {};
let categories = JSON.parse(localStorage.getItem("categories")) || [
  "Contract",
  "Office",
  "Marketing",
  "Warranties",
  "Animals",
  "Food",
  "Technology",
  "Position",
  "Department",
  "Academic",
  "Event",
  "Custom",
];

const categorySelect = document.getElementById("categorySelect");

function updateCategorySelect() {
  categorySelect.innerHTML = "";
  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
  localStorage.setItem("categories", JSON.stringify(categories));
}

function addCategory() {
  const newCat = prompt("Nhập tên Category mới:");
  if (newCat && !categories.includes(newCat)) {
    categories.push(newCat);
    updateCategorySelect();
    showMsg("Đã thêm Category mới!");
  }
}

function saveData() {
  localStorage.setItem("vocab", JSON.stringify(vocab));
}

function render() {
  const categoriesDiv = document.getElementById("categories");
  const statsDiv = document.getElementById("stats");
  categoriesDiv.innerHTML = "";
  let total = 0;

  for (const cat in vocab) {
    total += vocab[cat].length;
    const catDiv = document.createElement("div");
    catDiv.className = "category";
    catDiv.innerHTML = `
      <h3 onclick="toggleList(this)">
        ${cat} <span>(${vocab[cat].length})</span>
      </h3>
      <ul>
        ${vocab[cat]
          .map(
            (item, idx) => `
          <li>
            <span><b>${item.en}</b> – ${item.vi}</span>
            <div>
              <button class="delete-btn" onclick="deleteWord('${cat}', ${idx})">Xóa</button>
              <button class="delete-btn" onclick="speakText('${item.en}')">🔊</button>
            </div>
          </li>`
          )
          .join("")}
      </ul>`;
    categoriesDiv.appendChild(catDiv);
  }

  statsDiv.textContent = "Tổng số từ: " + total;
}

function addWord() {
  const en = document.getElementById("wordInput").value.trim();
  const vi = document.getElementById("meaningInput").value.trim();
  const cat = categorySelect.value;

  if (en && vi) {
    if (!vocab[cat]) vocab[cat] = [];
    vocab[cat].push({ en, vi });
    saveData();
    render();
    showMsg("Đã lưu từ vựng!");
    document.getElementById("wordInput").value = "";
    document.getElementById("meaningInput").value = "";
  }
}

function deleteWord(cat, idx) {
  vocab[cat].splice(idx, 1);
  if (vocab[cat].length === 0) delete vocab[cat];
  saveData();
  render();
}

function speakText(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  speechSynthesis.speak(u);
}

function toggleList(h3) {
  const ul = h3.nextElementSibling;
  ul.style.display = ul.style.display === "block" ? "none" : "block";
}

function showMsg(text) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 1500);
}

updateCategorySelect();
render();
