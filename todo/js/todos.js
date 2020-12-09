export default class Todo {
    constructor(){
        this.todos = [
            {
                title: 'Drink Milk',
                status: 'Complete'
            }
        ];
        this.renderTodo();
    }
    
    addTodo(todo){
        this.todos.push(todo);
    }
    
    deleteTodo(id){
        this.todos.splice(id,1);
    }
    
    markComplete(id){
        this.todos[id].status = 'Complete';
    }
    
    markPending(id){
        this.todos[id].status = 'Pending';
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


