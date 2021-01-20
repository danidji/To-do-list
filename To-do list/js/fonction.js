//Fonction qui ajoute une nouvelle ligne de tache
const addTask = (e) => {
    //ouvre une fenêtre textuelle pour renseigner sa tâche
    let taskName = window.prompt('Renseigner une nouvelle tâche',e.target.textContent);
    //Si une tâche est renseigné :
    if (taskName!==null){
        //Création d'une nouvelle ligne de lisgne avec une checkbox + tache
        let ulElt = document.getElementById("liste");
        let liElt = document.createElement("li");

        let divCheckElt = document.createElement("div");
        let checkBoxElt = document.createElement("input");
        let labelElt = document.createElement("label");

        let divButtonElt = document.createElement("div");
        let deleteElt = document.createElement("button");
        let modifyElt = document.createElement("button");


        let idt = getId(taskList,idTab); //appel de la fonction qui génère un id unique pour les checkbox
        
        liElt.id = "li" + idLi;
        // paramétrage des checkbox
        divCheckElt.id = "divCheck" + idLi;
        checkBoxElt.type = 'checkbox';
        checkBoxElt.id = idt;
        labelElt.id = "label" + idLi;
        //checkBoxElt.onchange= doneTask; 
        //labelElt.setAttribute("for", checkBoxElt.id );
        //labelElt.textContent = taskName;

        //paramétrage des boutons 
        divButtonElt.id = "divButton" + idLi;
        deleteElt.textContent = "Supprimer";
        deleteElt.id="delete"+ idLi;
        modifyElt.textContent = "Modifier";
        modifyElt.id = "modify" + idLi;

        checkBoxElt.addEventListener("click", doneTask)
        deleteElt.addEventListener("click", deleteTask);
        modifyElt.addEventListener("click", modifyTask);

        ulElt.appendChild(liElt);
        liElt.appendChild(divCheckElt);
        liElt.appendChild(divButtonElt);
        labelElt.append(checkBoxElt,taskName);
        divCheckElt.appendChild(labelElt);
        divButtonElt.appendChild(deleteElt);
        divButtonElt.appendChild(modifyElt);



        let newTask = new task(taskName,false,idt);
        taskList.push(newTask);
        idLi++; // on incrémente l'id à chaque nouvelle tache
    }
}

//Fonction qui gère la réalisation d'une tache
const doneTask = (e) => {
    let labelId = e.target.parentElement.id;  
    let divId = document.getElementById(labelId).parentElement.id;
    let liId = document.getElementById(divId).parentElement.id;
    
    //Si aucune tâche ne sont encore réalisé :
    if ( document.getElementById("done") === null){
        //Création de la section "done"
        let sectionElt = document.createElement("section");
        let titleElt = document.createElement("h2");
        let ulElt = document.createElement("ul");
        titleElt.textContent = "Fait";
        sectionElt.id = "done";
        ulElt.id = "checkListDone";

        document.getElementById("todo").appendChild(sectionElt);
        sectionElt.appendChild(titleElt);
        sectionElt.appendChild(ulElt);

        document.getElementById("checkListDone").style.textDecoration = "line-through";
    } 
    //Si la checkbox est bien coché, on duplique la tache, on l'insère dans la section "done" et on la supprime de la section "todo"
    if (e.target.checked){
        // Récupération de l'id pour la tache réalisé
        document.getElementById("checkListDone").appendChild(document.getElementById(liId));
        //On passe le booléen "done" du tableau tasklist à true
        for (let i in taskList){
            if (e.target.id === taskList[i].idt){
                taskList[i].done = true;
            }
        } 
    } else {
        document.getElementById("liste").appendChild(document.getElementById(liId));

        for (let i in taskList){
            if (e.target.id === taskList[i].idt){
                taskList[i].done = false;
            }
        } 
    }
}

//Fonction de suppresion d'une tache : 
const deleteTask = (e) => {
    let parentId = e.target.parentElement.id;
    let liId = document.getElementById(parentId).parentElement.id;
    let ulId = document.getElementById(liId).parentElement.id;

    document.getElementById(ulId).removeChild(document.getElementById(liId));

} 

//Fonction qui permet de modifier une tache 
const modifyTask = (e) => {
    let taskName = window.prompt("Modifier la tache :",e.target.textContent);
    let num = e.target.id.match(/\d+/g).join('');
    let labelId = 'label' + num;
    let checkboxElt = document.createElement("input");
    checkboxElt.type ='checkbox';
    checkboxElt.id = "checkbox" + num;
    document.getElementById(labelId).textContent = "";
    document.getElementById(labelId).append(checkboxElt, taskName);
    checkboxElt.addEventListener("click", doneTask);
}

//Générer un id de checkbox unique
const getId = (tab,idTab) => {
    for (let i=0; i<tab.length+1; i++){
        if (tab[i]===undefined){
            idTab.push('checkbox'+ i )
            return idTab[i];
        }
    }
}

const returnCheckboxId = (e) => {
    checkboxId = e.target.id ;
    return checkboxId;
}

