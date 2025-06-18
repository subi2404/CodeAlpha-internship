// ✅ AUTH CHECK
if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'login.html';
}

function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
}

// ✅ SPA Section Switcher
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  const section = document.getElementById(id + '-section');
  if (section) section.style.display = 'block';

  // If Projects tab is clicked, load project view
  if (id === 'projects') loadProjectsView();
}

// ✅ MODAL HANDLERS
function toggleModal() {
  const modal = document.getElementById("taskModal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function clearForm() {
  document.querySelector("#task-name").value = "";
  document.querySelector("#task-weight").value = "";
  document.querySelector("#task-priority").value = "low";
  document.querySelector("#task-state").value = "to do";
  document.querySelector("#task-desc").value = "";
}

function getDotColor(priority) {
  switch (priority.toLowerCase()) {
    case "low": return "blue";
    case "medium": return "orange";
    case "high": return "red";
    default: return "blue";
  }
}

// ✅ TASK CREATION
function addNewTask() {
  const name = document.querySelector("#task-name").value.trim();
  const weight = document.querySelector("#task-weight").value.trim();
  const priority = document.querySelector("#task-priority").value;
  const state = document.querySelector("#task-state").value.toLowerCase();
  const description = document.querySelector("#task-desc").value.trim();

  if (!name || !weight || !priority || !state) {
    alert("Please fill in all fields.");
    return;
  }

  const task = document.createElement("div");
  task.classList.add("task");
  task.innerHTML = `w.${weight} <br> ${name} <span class="dot ${getDotColor(priority)}"></span>`;

  const columns = document.querySelectorAll(".task-column");
  if (state === 'to do') columns[0].appendChild(task);
  if (state === 'doing') columns[1].appendChild(task);
  if (state === 'done') columns[2].appendChild(task);

  toggleModal();
  clearForm();
}

// ✅ EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".save-btn");
  if (saveBtn) saveBtn.addEventListener("click", addNewTask);
});

// ✅ STATIC PROJECT DATA
const projects = [
  { name: 'E-commerce Website', description: 'A user friendly e-commerce site.' },
  { name: 'Portfolio Builder', description: 'Create your personal portfolio site easily.' },
  { name: 'Client CRM', description: 'Track clients and manage communication.' }
];

// ✅ PROJECT LISTING SPA VIEW
function loadProjectsView() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  grid.innerHTML = projects.map(project => `
    <div class="project-card" onclick="openProject('${project.name}')">
      <h3>${project.name}</h3>
      <p>${project.description}</p>
    </div>
  `).join('');
}

// ✅ OPEN INDIVIDUAL PROJECT DASHBOARD
function openProject(projectName) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');

  const main = document.querySelector('.main-content');
  main.innerHTML = `
    <section class="section">
      <h1>${projectName} ✏️</h1>
      <p class="description">This is the project dashboard for <b>${projectName}</b>.</p>

      <section class="tags">
        <span class="tag">Planning</span>
        <span class="tag">Design</span>
        <span class="tag">Development</span>
      </section>

      <div class="task-panel">
        <div class="task-column">
          <h3>To Do</h3>
          <div class="task">w.3 <br> Initial Setup <span class="dot blue"></span></div>
        </div>
        <div class="task-column">
          <h3>Doing</h3>
          <div class="task">w.2 <br> Wireframes <span class="dot orange"></span></div>
        </div>
        <div class="task-column">
          <h3>Done</h3>
          <div class="task">w.1 <br> Requirements <span class="dot green"></span></div>
        </div>
      </div>

      <button class="new-task-btn" onclick="toggleModal()">+ New Task</button>
    </section>
  `;
}