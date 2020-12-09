export default class Todo {
    constructor(){
        this.firebaseConfig = {
            apiKey: "AIzaSyBvHWj28zixu94RpC1h31klK1aL2ckrv_8",
            authDomain: "my-todo-app-31e42.firebaseapp.com",
            databaseURL: "https://my-todo-app-31e42.firebaseio.com",
            projectId: "my-todo-app-31e42",
            storageBucket: "my-todo-app-31e42.appspot.com",
            messagingSenderId: "616938649383",
            appId: "1:616938649383:web:4c2b2f7ef5e6c4a52d1b02",
            measurementId: "G-SDBBNFL72J"
          };
          // Initialize Firebase
          firebase.initializeApp(this.firebaseConfig);
          firebase.analytics();
          this.ui = new firebaseui.auth.AuthUI(firebase.auth());
          var uiConfig = {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                document.querySelector('.auth').style.display = 'none';
                document.querySelector('.todo-form').style.display = 'block';
                document.querySelector('.todo-table').style.display = 'block';
                return false;
              },
              uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
                document.querySelector('.todo-form').style.display = 'none';
                document.querySelector('.todo-table').style.display = 'none';
              }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: 'index.html',
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
          };
          this.ui.start('#firebaseui-auth-container', uiConfig);
          
          this.monitorUserState();
          this.todos = [];
          this.loading = true;
          this.renderTodo();
          
    }

    monitorUserState(){
        firebase.auth().onAuthStateChanged(function(user) {
            this.user = user;
            if (user) {
                this.dbRef = firebase.database().ref(user.uid);
                this.todosRef = this.dbRef;
                this.getTodos().then(todos => {
                    console.log(todos);
                    this.loading = false;
                    this.todos = todos;
                    this.renderTodo();
                });
                this.monitorTodos();
            } else {
                document.querySelector('.auth').style.display = 'block';
                document.querySelector('.todo-form').style.display = 'none';
                document.querySelector('.todo-table').style.display = 'none';
            }
        });
    }


    getTodos(){
        return this.todosRef.once("value").then(snap => {
            return snap.val();
        });
    }

    monitorTodos(){
        this.todosRef.on("value",snap => {
            this.todos = snap.val();
            this.renderTodo();
        });
    }
    
    addTodo(todo){
        this.todos.push(todo);
        this.saveTodos();
    }
    
    deleteTodo(id){
        this.todos.splice(id,1);
        this.saveTodos();
    }
    
    markComplete(id){
        this.todos[id].status = 'Complete';
        this.saveTodos();
    }
    
    markPending(id){
        this.todos[id].status = 'Pending';
        this.saveTodos();
    }

    saveTodos(){
        this.todosRef.set(this.todos);
    }

    renderTodo(){
        let htmlBody = document.querySelector(".todo-table table tbody");
        htmlBody.innerHTML = '';
        if(this.todos.length <= 0){
            htmlBody.innerHTML += `<tr><td colspan="3">Updating...</td></tr>`; 
        }else{
            this.todos.forEach(function(todo,i){
                htmlBody.innerHTML += `<tr class="${todo.status=='Complete'?'complete':''}">
                                            <td><input type="checkbox" ${todo.status=='Complete'?'checked':''} name="" id="${i}"></td>
                                            <td>${todo.title}</td>
                                            <td>${todo.status}</td>
                                        </tr>`; 
            });

        }
        
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
        
        
        if(this.loading){
            status.innerHTML = `Downloading data from server.`;
        }else if(total==complete){
            status.innerHTML = `Congratulations!!! All Tasks completed.`;
        }else{
            status.innerHTML = `${total} Total, ${complete} Complete and ${total-complete} Pending`;
        }
    }
}










/* 
todosRef.on("child_added", snap => {
    todos.push(snap.val());
    console.log(snap.val());
    renderTodo();
}); */

