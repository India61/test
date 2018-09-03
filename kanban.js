// global array/object för lagring av todos
var todoObj = {};

window.addEventListener("DOMContentLoaded", initContent);

function initContent(){

    let todo = localStorage.getItem("todo");

    todoObj = JSON.parse(todo);
    console.log("From local: "+todoObj);

    for(let i in todoObj){

        console.log(todoObj[i].kanban);


        let initTemplate = _classArr('taskTemplate')[0];   
        let newTemplate = initTemplate.cloneNode(true);
        newTemplate.className = todoObj[i].className;
        newTemplate.innerHTML = todoObj[i].content;
        newTemplate.id = i;
        let kanban = _classArr('kanban');
       
        kanban[todoObj[i].kanban].appendChild(newTemplate);
        
        newTemplate.addEventListener("click", toNext);
        newTemplate.children[2].addEventListener("click", deleteParent);
        newTemplate.children[3].addEventListener("click", moveBack);

        console.log(newTemplate);
    }
}



//inläsning av viktiga element
const newTaskButton = document.getElementById('newTaskButton');


// Lägg till lyssnare till element
newTaskButton.addEventListener("click", saveNewTask);


function saveNewTask(){

    const id = "_"+ new Date().getTime();
    
    //Datum
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = yyyy+'-'+mm+'-'+dd;


    let newTask = document.getElementById("newTask").value;

    if(newTask.length > 0){
        const taskTemplate = document.getElementsByClassName("taskTemplate")[0];

        //meka med templaten    
        let newTemplate = taskTemplate.cloneNode(true);
        newTemplate.className = "clonedTaskTemplate";
        newTemplate.children[0].innerHTML = today;
        newTemplate.children[1].innerHTML = newTask;

        newTemplate.addEventListener("click", toNext);
        newTemplate.children[2].addEventListener("click", deleteParent);
        newTemplate.children[3].addEventListener("click", moveBack);
        newTemplate.id = id;

        let todo = _classArr("kanban")[0];
        todo.appendChild(newTemplate);
        

        let todoInfo = {};
        todoInfo.kanban = 0;
    
        todoInfo.content = newTemplate.innerHTML;
        todoInfo.className = newTemplate.className;
        todoObj[id] = todoInfo;
        //console.log(todoObj);
        saveToLocal();
    }


}

function toNext(){
    
    //det vi klickade på finns i this
    //det har ett id som låter oss komma åt todoObj
    const id = this.id;
    //console.log(todoObj);
    
    
    //Hämta kanbanklassen gör om till array
    const kanban = _classArr('kanban');

    let kanbanIndex = kanban.indexOf(this.parentElement);

    if(kanbanIndex < kanban.length + 1)
    {
        kanban[kanbanIndex+1].appendChild(this);
        todoObj[id].kanban += 1;    
        console.log(todoObj);
         saveToLocal();
    }
}


function deleteParent(ev){


    ev.stopPropagation();
    const parent = this.parentElement;
    const gp = parent.parentElement;
    gp.removeChild(parent);
    delete todoObj[id];
    saveToLocal();
}

function moveBack(ev){



    ev.stopPropagation();
    const kanban = _classArr('kanban');

    let kanbanIndex = kanban.indexOf(this.parentElement.parentElement);

    if(kanbanIndex<kanban.length-1){
        kanban[kanbanIndex-1].appendChild(this.parentElement);

        //det vi klickade på finns i this.parentElement
        //det har ett id som låter oss komma åt todoObj
        const id = this.parentElement.id;
        todoObj[id].kanban -= 1;
        //console.log(todoObj);
        saveToLocal();
    }
}


//Helpers

function _classArr(cName){
    return Array.from(document.getElementsByClassName(cName));

}

function saveToLocal(){
    const todoString = JSON.stringify(todoObj);
    localStorage.setItem("todo", todoString);
}