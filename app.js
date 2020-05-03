//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Event Listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',delete_and_check);


//Functions
function delete_and_check(event){
    console.log(event.target);
    const item = event.target;
    //delete
    if(item.classList[0] === 'trash-button'){
        item.parentElement.remove();

    }


}

function addTodo(event){
    event.preventDefault();

    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    todoInput.value = "";
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
}