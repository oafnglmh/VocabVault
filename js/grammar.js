let grammarNotes = JSON.parse(localStorage.getItem("grammarNotes")) || [];
let currentIndex = null;

function saveGrammar() {
  localStorage.setItem("grammarNotes", JSON.stringify(grammarNotes));
}

function renderGrammar() {
  const listDiv = document.getElementById("grammarList");
  const stats = document.getElementById("grammarStats");
  listDiv.innerHTML = "";
  grammarNotes.forEach((note, i) => {
    const box = document.createElement("div");
    box.className = "category";
    box.innerHTML = `
      <h3>
        <span onclick="openModal(${i})">${note.title}</span>
        <button class="delete-btn" onclick="deleteGrammar(${i})">Xóa</button>
      </h3>
    `;
    listDiv.appendChild(box);
  });
  stats.textContent = "Tổng số bài: " + grammarNotes.length;
}

function addGrammar() {
  const title = document.getElementById("grammarTitle").value.trim();
  // const content = document.getElementById("grammarContent").value.trim();
  if (!title) return;

  grammarNotes.push({ title });
  saveGrammar();
  renderGrammar();
  showMsg("Đã lưu bài ngữ pháp!");
  document.getElementById("grammarTitle").value = "";
  document.getElementById("grammarContent").value = "";
}

function deleteGrammar(index) {
  if (confirm("Xóa bài này?")) {
    grammarNotes.splice(index, 1);
    saveGrammar();
    renderGrammar();
  }
}

function openModal(index) {
  currentIndex = index;
  const note = grammarNotes[index];
  document.getElementById("modalTitle").textContent = note.title;
  document.getElementById("modalContent").value = note.content;
  document.getElementById("grammarModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("grammarModal").style.display = "none";
}

function saveEdit() {
  const newContent = document.getElementById("modalContent").value.trim();
  if (currentIndex !== null) {
    grammarNotes[currentIndex].content = newContent;
    saveGrammar();
    renderGrammar();
    showMsg("Đã lưu chỉnh sửa!");
  }
  closeModal();
}

function showMsg(text) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 1500);
}

renderGrammar();
