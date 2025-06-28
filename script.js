  document.querySelector("#logoutBtn")?.addEventListener("click", () => {
  window.location.href = "login.html";
});

// Add Task
function addTask() {
  const title = document.querySelector("#modal-input").value.trim();
  const desc = document.querySelector("#modal-desc").value.trim();
  const priority = document.querySelector("#priority").value;
  const status = document.querySelector("#status").value;
  const dueDate = document.querySelector("#due-date").value;


  if (!title || !desc || !priority || !status || !dueDate) {
    alert("Please fill in all fields.");
    return;
  }

  const task = {
    title,
    desc,
    priority,
    status,
    iscompleted: status === "Completed",
    dueDate,
    timestamp: Date.now()
  };

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks("all");
  resetModal();
}



function resetModal() {


    setTimeout(() => {
    document.getElementById("addTaskBtn")?.focus();
  }, 10);

  // Reset fields
  document.querySelector("#modal-input").value = "";
  document.querySelector("#modal-desc").value = "";
  document.querySelector("#priority").value = "low";
  document.querySelector("#status").value = "To Do";
  document.querySelector("#due-date").value = "";

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.querySelector("#taskModal"));
  modal.hide();
}


// Display Task Card
function displayTask(task) {
  const today = new Date();
  const due = new Date(task.dueDate);
  if (due < today && !task.iscompleted) return;

  const card = document.createElement("div");
  card.className = "card col-12 col-sm-12 col-md-3  col-lg-3 bg-light text-dark text-light m-2 p-3 shadow mx-5";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.iscompleted;
  checkbox.className = "form-check-input me-2";
  checkbox.onchange = () => {
    task.iscompleted = checkbox.checked;
    if (checkbox.checked) task.status = "Completed";
    updateTask(task);
  };

  const title = document.createElement("h5");
  title.innerHTML = task.iscompleted ? `<del>${task.title}</del>` : task.title;

  const desc = document.createElement("p");
  desc.textContent = task.desc;

  const badgeWrap = document.createElement("div");
  badgeWrap.innerHTML = `
    <span class="badge bg-${getPriorityColor(task.priority)} me-2">${task.priority}</span>
    <span class="badge bg-info">${task.status}</span>
  `;

  const dueDate = document.createElement("p");
  dueDate.textContent = "Due: " + new Date(task.dueDate).toLocaleDateString();

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "btn btn-outline-danger me-2 mt-2";
  delBtn.onclick = () => deleteTask(task);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "btn btn-outline-warning mt-2";
  editBtn.onclick = () => {
    const newTitle = prompt("Edit title", task.title);
    if (newTitle && newTitle.trim() !== "") {
      task.title = newTitle.trim();
      updateTask(task);
    }
  };

  card.appendChild(checkbox);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(badgeWrap);
  card.appendChild(dueDate);
  card.appendChild(delBtn);
  card.appendChild(editBtn);

  document.querySelector(".cards-data").appendChild(card);
}


function getPriorityColor(priority) {
  if (!priority) return "secondary"; // fallback badge color
  switch (priority.toLowerCase()) {
    case "high": return "danger";
    case "medium": return "warning";
    case "low": return "success";
    default: return "secondary";
  }
}


// Render Tasks
function renderTasks(filter = "all", sortOrder = "asc") {
  // document.querySelector(".cards-data").innerHTML = "";
  // let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // if (filter === "completed") {
  //   tasks = tasks.filter(t => t.iscompleted);
  // } else if (filter === "pending") {
  //   tasks = tasks.filter(t => !t.iscompleted);
  // }

  // // Sort by due date ascending
  // tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  // tasks.forEach(displayTask);
   document.querySelector(".cards-data").innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (filter === "completed") {
    tasks = tasks.filter(t => t.iscompleted);
  } else if (filter === "pending") {
    tasks = tasks.filter(t => !t.iscompleted);
  }

  tasks.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  tasks.forEach(displayTask);
}

// Update Task
function updateTask(updatedTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let index = tasks.findIndex(t => t.timestamp === updatedTask.timestamp);
  if (index !== -1) {
    tasks[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  renderTasks("all");
}

// Delete Task
function deleteTask(taskToDelete) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.timestamp !== taskToDelete.timestamp);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks("all");
}

// Filter Button Events
document.getElementById("AllTasks").onclick = () => renderTasks("all");
document.getElementById("completedTasks").onclick = () => renderTasks("completed");
document.getElementById("pendingTasks").onclick = () => renderTasks("pending");

// Initial Render
window.onload = () => renderTasks("all");

function handleSortChange() {
  const sortOrder = document.getElementById("sortBy")?.value || "asc";
  renderTasks("all", sortOrder);
}

window.handleSortChange = handleSortChange;
