var showCurrentTime = () => {
    var clock = document.getElementById('clock'),

        today = new Date(),

        hours = today.getHours(),
        minutes = today.getMinutes(),

        meridian = "AM";

    if (hours > 12) {
        hours -= 12;
        meridian = "PM";
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    var clockTime = hours + ':' + minutes + ' ' + meridian;
    clock.innerText = clockTime;
}

setInterval(showCurrentTime, 1000);

const inputValue = document.querySelector('.todoInput'),
    todoList = document.querySelector('.todoList'),
    addTaskBtn = document.querySelector('.addButton'),

    allItemsBtn = document.querySelector('.allItems'),
    activeItems = document.querySelector('.activeItems'),
    completedItems = document.querySelector('.completedItems'),
    clearCompletedBtn = document.querySelector('.clearCompleted'),

    itemsLeft = document.querySelector('.itemsLeft'),
    borderBottom = document.querySelector(".todos");

todoList.addEventListener('click', deleteTask);

let listItems = 0;

inputValue.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        validateInput();
    }
})

addTaskBtn.addEventListener('click', () => {
    validateInput();
})

const validateInput = () => {
    if (inputValue.value === "") {
        alert('Please enter a value');
        return;
    }

    renderTask(inputValue.value);
}

function itemsValue() {
    if (listItems == 1) {
        itemsLeft.innerText = `${listItems} item left`;
    } else if (listItems > 1 || listItems == 0) {
        itemsLeft.innerText = `${listItems} items left`;
    }
}

function renderTask() {
    // Create task item
    const todos = document.createElement("li");
    todos.classList.add("todos");

    // Create checkBox
    const checkBox = document.createElement("input");
    checkBox.classList.add('checkbox-list');
    checkBox.setAttribute("type", "checkbox");

    // Create list item
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');
    listItem.innerHTML = inputValue.value;

    // Create X-icon
    const xIcon = document.createElement("img");
    xIcon.classList.add("xClose");
    // xIcon.setAttribute("src", "../images/icon-cross.svg");

    // Edit button
    const EditBtnsWrapper = document.createElement('span');
    EditBtnsWrapper.classList.add('EditBtnsWrapper');

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-pencil-alt iconchange"></i> ';
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", () => {
        listItem.setAttribute("contentEditable", true);
        listItem.focus();
    });

    //Appends items to list
    EditBtnsWrapper.append(editButton, xIcon);
    todos.append(checkBox, listItem, EditBtnsWrapper);
    // todoList.appendChild(todos);
    todoList.insertBefore(todos, todoList.firstChild);

    inputValue.value = null;
    inputValue.focus();
    listItems++;
    itemsValue();
}

const removeSelected = () => {
    allItemsBtn.classList.remove('selected');
    activeItems.classList.remove('selected');
    completedItems.classList.remove('selected');
}

//Deletes tasks
function deleteTask(x) {
    const item = x.target;
    const todo = item.parentElement.parentElement;

    //Removes todo item
    if (item.classList[0] === "xClose") {
        todo.remove();
        listItems--;
        itemsValue();
    }

    //Marks todo as completed
    if (item.classList[0] === "checkbox-list") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

completedItems.addEventListener('click', () => {
    removeSelected();
    completedItems.classList.add('selected');
    const allTodos = todoList.childNodes;
    allTodos.forEach((todo) => {
        if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    })
})

activeItems.onclick = () => {
    removeSelected();
    activeItems.classList.add("selected");
    const allTodos = todoList.childNodes;
    allTodos.forEach((todo) => {
        if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
};

//Show all tasks
allItemsBtn.onclick = () => {
    removeSelected();
    allItemsBtn.classList.add("selected");
    const allTodos = todoList.childNodes;
    allTodos.forEach((todo) => {
        if (todo.classList.contains("todos")) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
};

//Clear completed Tasks
clearCompletedBtn.onclick = () => {
    const completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach((task) => task.remove());
    listItemsDeleted = completedTasks.length;
    listItems -= listItemsDeleted;
    itemsValue();
};

//drag and drop
const dragArea = document.querySelector("#todoList");
new Sortable(dragArea, {
    animation: 350,
});