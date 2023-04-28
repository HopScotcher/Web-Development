let addTaskBtn = document.querySelector("#submit-task");
let input = document.forms["form"]["new-task"];
let listOfItems = document.querySelector("ul");
let removeAllItemsBtn = document.querySelector(".clear-all");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(e) {
  e.preventDefault();

  let newTask = input.value;

  let task = {
    value: newTask,
    checked: false,
  };
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks, listOfItems);
  console.log(`input.value = ${input.value}`);

  input.value = "";
}

function displayTasks(tasks = [], htmlList) {
  console.log("tasks = ", tasks);

  htmlList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;
    li.setAttribute("id", `${index}`);

    checkbox.addEventListener("click", () => {
      checkbox.checked ? checkbox.checked === false : checkbox.checked;
      tasks[index].checked = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      let id = parseInt(li.getAttribute("id"));
      console.log("id = ", id);
      console.log(typeof id);
      console.log(tasks[id].value);
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.value));
    htmlList.appendChild(li);

    li.addEventListener("dblclick", () => {
      let id = parseInt(li.getAttribute("id"));

      let newList = tasks.splice(id, 1);
      console.log(newList);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks(tasks, htmlList);
    });
  });
}

function clearAllItems() {
  localStorage.removeItem("tasks");
  displayTasks(tasks, listOfItems);
}

window.document.addEventListener(
  "DOMContentLoaded",
  displayTasks(tasks, listOfItems)
);

addTaskBtn.addEventListener("click", addTask);
removeAllItemsBtn.addEventListener("click", clearAllItems);
