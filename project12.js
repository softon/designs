let button = document.querySelector("#add-btn");

let textbox = document.getElementById("add-todo");
calculateSummary();
console.log(textbox.getAttribute('value'));

button.addEventListener('click', function(e){
    e.preventDefault();

    let data = textbox.value;

    let table = document.querySelector("table tbody");
    let newTr = document.createElement("tr");
    newTr.innerHTML = "<td><input type=\"checkbox\" class=\"todo-check\" name=\"\" id=\"\"></td>    <td>"+ data +"</td>    <td>Pending</td>";
    table.appendChild(newTr);
    calculateSummary();
});

let checkboxes = document.querySelectorAll(".todo-check");

//for(let checkbox of checkboxes){
    /* checkbox.addEventListener("click", function(e){
        if(e.target.checked== true){
            let tr = e.target.parentNode.parentNode;
            tr.classList.add("complete");
        }else{
            let tr = e.target.parentNode.parentNode;
            tr.classList.remove("complete");
        }
    }); */
    document.querySelector("table").addEventListener('click', function(e){
            if(e.target.classList.contains("todo-check")){
                if(e.target.checked== true){
                    let tr = e.target.parentNode.parentNode;
                    tr.classList.add("complete");
                    tr.lastElementChild.innerHTML = 'Complete';
                }else{
                    let tr = e.target.parentNode.parentNode;
                    tr.classList.remove("complete");
                    tr.lastElementChild.innerHTML = 'Pending';
                }
                calculateSummary();
            }
    });
//}

function calculateSummary(){
    let summary = document.getElementById("todo-summary");
    let total = 0;
    let complete = 0;
    let pending = 0;

    document.querySelectorAll('.todo-check').forEach(checkbox => {
        total++;
        if(checkbox.checked){
            complete++;
        }
    });

    pending = total - complete;

    if(total == complete){
        summary.innerHTML = 'Congratulations!!! All tasks complete.';
    }else{
        summary.innerHTML = `${total} Todo's Total, ${complete} Complete & ${pending} Pending`;
    }
}



