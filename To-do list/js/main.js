class task {
    constructor(name, done, idt){
        this.name = name;
        this.done = done;
        this.idt = idt;
    }
}
let addElt = document.getElementById("add");
const taskList = []; //tableau contenant la liste des taches
const idTab = [];//tableau contenant les id des inputs (checkbox)
let idLi = 0;// initialisation du numéro d'id de ligne
let checkboxId = 0;
let taskElt = document.getElementById("checkboxId");


//Ajouter une nouvelle tâche
addElt.addEventListener("click", addTask);