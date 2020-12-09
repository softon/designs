export default class Todo {
    constructor(){
        this.todos = this.getTodos();
        this.renderTodo();
    }

    getTodos(){
        let todos_storage = localStorage.getItem('todos');
        if(!todos_storage){
            return [];
        }
    
        return JSON.parse(todos_storage);
    }
    
    addTodo(todo){
        this.todos.push(todo);
        this.saveTodosToStorage();
    }
    
    deleteTodo(id){
        this.todos.splice(id,1);
        this.saveTodosToStorage();
    }
    
    markComplete(id){
        this.todos[id].status = 'Complete';
        this.saveTodosToStorage();
    }
    
    markPending(id){
        this.todos[id].status = 'Pending';
        this.saveTodosToStorage();
    }

    saveTodosToStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    renderTodo(){
        let htmlBody = document.querySelector(".todo-table table tbody");
        htmlBody.innerHTML = '';
        this.todos.forEach(function(todo,i){
            htmlBody.innerHTML += `<tr class="${todo.status=='Complete'?'complete':''}">
                                        <td><input type="checkbox" ${todo.status=='Complete'?'checked':''} name="" id="${i}"></td>
                                        <td>${todo.title}</td>
                                        <td>${todo.status}</td>
                                    </tr>`; 
        });

        this.calculateTodoStatus();
    }

    calculateTodoStatus(){
        let total = 0;
        let complete = 0;
        for(let todo of this.todos){
            total++;
            if(todo.status=='Complete'){
                complete++;
            }
        }
        let status = document.querySelector('.todo-table small');
        
        if(total==complete){
            status.innerHTML = `Congratulations!!! All Tasks completed.`;
        }else{
            status.innerHTML = `${total} Total, ${complete} Complete and ${total-complete} Pending`;
        }
    }
}





