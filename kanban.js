// global array/object för lagring av todos
var todoObj = {};




//inläsning av viktiga element
const newTaskButton = document.getElementById('newTaskButton');


// Lägg till lyssnare till element
newTaskButton.addEventListener("click", saveNewTask);


function saveNewTask(){

    const id = "_"+ new Date().getTime();

    let newTask = document.getElementById("newTask").value;

    if(newTask.length > 0){
        const taskTemplate = document.getElementsByClassName("taskTemplate")[0];

        //meka med templaten
        let newTemplate = taskTemplate.cloneNode(true);
        newTemplate.className = "clonedTaskTemplate";
        newTemplate.children[0].innerHTML = "Dagens datum fixa sen...";
        newTemplate.children[1].innerHTML = newTask;

        newTemplate.addEventListener("click", toNext);
        newTemplate.children[2].addEventListener("click", deleteParent);
        newTemplate.children[3].addEventListener("click", moveBack);
        newTemplate.id = id;

        let todo = _classArr("kanban")[0];
        todo.appendChild(newTemplate);
        

        let todoInfo = {};
        todoInfo.kanban = 0;
        todoInfo.content = newTemplate;
        todoObj[id] = todoInfo;

        console.log(todoObj);
    }


}

function toNext(){
    
    //det vi klickade på finns i this
    //det har ett id som låter oss komma åt todoObj
    const id = this.id;
    todoObj[id].kanban += 1;
    console.log(todoObj);
    
    
    //Hämta kanbanklassen gör om till array
    const kanban = _classArr('kanban');

    let kanbanIndex = kanban.indexOf(this.parentElement);

    if(kanbanIndex+1<kanban.length)
        kanban[kanbanIndex+1].appendChild(this);

}


function deleteParent(ev){


    ev.stopPropagation();
   const parent = this.parentElement;
    const gp = parent.parentElement;
    gp.removeChild(parent);
}

function moveBack(ev){



    ev.stopPropagation();
    const kanban = _classArr('kanban');

    let kanbanIndex = kanban.indexOf(this.parentElement.parentElement);

    if(kanbanIndex-1<kanban.length)
        kanban[kanbanIndex-1].appendChild(this.parentElement);

        //det vi klickade på finns i this.parentElement
        //det har ett id som låter oss komma åt todoObj
        const id = this.parentElement.id;
        todoObj[id].kanban -= 1;
        console.log(todoObj);
}


//Helpers

function _classArr(cName){
    return Array.from(document.getElementsByClassName(cName));

}