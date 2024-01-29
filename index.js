let todoItemsContainer = document.getElementById("todoItemsContainer");
let addBtn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtn");

function getTodoListFromLocalStorage() {
    let stringifyTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifyTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}


let todoList = getTodoListFromLocalStorage();
let todoCount = todoList.length;


function createAndAppendTodoList(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;

    let todoLiElement = document.createElement("li");
    todoLiElement.id = todoId;
    todoLiElement.classList.add("todoLiElement");
    todoItemsContainer.appendChild(todoLiElement);

    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = checkboxId;
    checkboxElement.checked = todo.isChecked;
    checkboxElement.classList.add("checkboxElement")
    function checkboxElementFun() {
        let getLabelId = document.getElementById(labelId);
        getLabelId.classList.toggle("checked");
        let todoObjectIndex = todoList.findIndex(function (i) {
            let eachTodoId = "todo" + i.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });
        let todoObject = todoList[todoObjectIndex];
        if (todoObject.isChecked === true) {
            todoObject.isChecked = false;
        } else {
            todoObject.isChecked = true;
        }
    }
    checkboxElement.addEventListener("click", checkboxElementFun)
    todoLiElement.appendChild(checkboxElement)

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("labelContainer")
    todoLiElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelElement.classList.add("labelElement");
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement)

    let delIconContainer = document.createElement("div");
    labelContainer.appendChild(delIconContainer)

    let delIconElement = document.createElement("i");
    delIconElement.classList.add("fa-solid", "fa-trash")
    function delIconElementFun() {
        let getTodoId = document.getElementById(todoId)
        todoItemsContainer.removeChild(getTodoId)
        let todoElementIndex = todoList.findIndex(function (i) {
            let eachTodoId = "todo" + i.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });
        todoList.splice(todoElementIndex,1)
    }
    delIconElement.addEventListener("click",delIconElementFun)
    delIconContainer.appendChild(delIconElement);
}

function addBtnFun() {
    let userInput = document.getElementById("userInput");
    let userinputValue = userInput.value;
    if (userinputValue === "") {
        alert("ENTER VALID TEXT");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: userinputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodoList(newTodo);
    userInput.value = "";
    
}

addBtn.addEventListener("click", addBtnFun)

function saveBtnFun() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

saveBtn.addEventListener("click", saveBtnFun)


for (let todo of todoList) {
    createAndAppendTodoList(todo);
}