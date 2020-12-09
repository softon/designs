import Todo from './todos-firebase.js';

let todoObj = new Todo();
let todoForm = document.querySelector(".todo-form form");
let htmlBody = document.querySelector(".todo-table table tbody");

todoForm.addEventListener('submit', function(e){
    e.preventDefault();

    let todoTitle = todoForm.todoname.value;
    
    todoObj.addTodo({ title: todoTitle, status: 'Pending'});

    todoObj.renderTodo();

    todoForm.todoname.value = '';
});

htmlBody.addEventListener('click', function(e){
    if(e.target.getAttribute('type')=='checkbox'){
        if(e.target.checked){
            todoObj.markComplete(e.target.id);
        }else{
            todoObj.markPending(e.target.id);
        }
        todoObj.renderTodo();
    }
});

htmlBody.addEventListener('dblclick', function(e){
    if(e.target.nodeName=='TD'){
        let tr = e.target.parentNode;
        let deleteBtn = document.querySelector(".delete-btn");
        deleteBtn.dataset.id = tr.firstElementChild.firstElementChild.id;
        let confirmModal = document.querySelector(".confirm-modal");
        confirmModal.classList.remove('hide-modal');
    }
});

document.querySelector(".cancel-btn").addEventListener('click', function (e){
    let confirmModal = document.querySelector(".confirm-modal");
    confirmModal.classList.add('hide-modal');
});

document.querySelector(".delete-btn").addEventListener('click', function (e){
    todoObj.deleteTodo(e.target.dataset.id);
    todoObj.renderTodo();
    
    let confirmModal = document.querySelector(".confirm-modal");
    confirmModal.classList.add('hide-modal');
});



