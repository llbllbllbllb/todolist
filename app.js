//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded',getLocalTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',delete_and_check);
filterOption.addEventListener('change',filterToDo);


//Functions
function delete_and_check(event){
    const item = event.target;
    //delete
    if(item.classList[0] === 'trash-button'){
        // animation
        item.parentElement.classList.add('fall');
        removeLocalTodos(item.parentElement);
        // check animation end
        item.parentElement.addEventListener('transitionend',function(){

            item.parentElement.remove();

        });

    }

    if(item.classList[0] === 'complete-button'){
        item.parentElement.classList.toggle('completed');
    }


}

function addTodo(event){
    event.preventDefault();

    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // add todo to local
    saveLocalToDos(todoInput.value);

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);




    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);

    //append to todo list
    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function filterToDo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;

        }

    });

    
}

// save todo to local storage
function saveLocalToDos(todo){
    // check already have todos in
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getLocalTodos(){
    // check already have todos in
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        todoDiv.appendChild(newTodo);
        //check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-button');
        todoDiv.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-button');
        todoDiv.appendChild(trashButton);

        //append to todo list
        todoList.appendChild(todoDiv);


    });

}

function removeLocalTodos(todo){
    // check already have todos in
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);

    todos.splice(todoIndex,1);
    console.log(todo.children[0].innerText);
    console.log(todos.indexOf(todo.children[0].innerText));

    localStorage.setItem('todos',JSON.stringify(todos));

    


}