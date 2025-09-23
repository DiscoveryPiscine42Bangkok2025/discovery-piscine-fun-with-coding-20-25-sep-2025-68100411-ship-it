
const list = document.getElementById("ft_list");
const newBtn = document.getElementById("new");

// Load saved tasks from cookies
window.onload = () => {
  const cookies = getCookie("todos");
  if (cookies) {
    const todos = JSON.parse(cookies);
    todos.forEach(task => addTask(task, false));
  }
};

// Add new task
newBtn.addEventListener("click", () => {
  const task = prompt("Enter a new TO DO:");
  if (task && task.trim() !== "") {
    addTask(task, true);
  }
});

function addTask(text, save) {
  const taskDiv = document.createElement("div");
  taskDiv.textContent = text;

  // Click to remove with confirm
  taskDiv.addEventListener("click", () => {
    if (confirm("Do you want to remove this TO DO?")) {
      list.removeChild(taskDiv);
      saveTasks();
    }
  });

  list.appendChild(taskDiv);

  if (save) saveTasks();
}

// Save tasks in cookies
function saveTasks() {
  const tasks = [];
  const children = list.querySelectorAll("div");
  children.forEach(div => tasks.push(div.textContent));
  setCookie("todos", JSON.stringify(tasks), 7);
}

// --- Cookie helpers ---
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}
