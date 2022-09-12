const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
let correct = 0;
let total = 0;
const totalDraggableItems = 1;
const totalMatchingPairs = 5; // Deve ser <= totalDraggableItems

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); 
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); 
  elem.addEventListener("dragover", dragOver); 
  elem.addEventListener("dragleave", dragLeave); 
  elem.addEventListener("drop", drop); 
});

// Drag and Drop Functions

// Eventos disparados sobre o drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Eventos disparados sobre o drop target

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault(); 
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); 

  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;
  
  total++;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData);
    event.target.appendChild(draggableElement);
    draggableElement.style.border = "none";
    draggableElement.style.padding = "0px";
    draggableElement.style.margin = "0px";
    draggableElement.setAttribute("draggable", "false");
    correct++;
  }

  if(correct === Math.min(totalMatchingPairs, totalDraggableItems)) { // Game Over!!
    
    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: 'RESPOSTA CORRETA',
            text: 'CAIXAS DE PIZZA SÃO FEITAS DE PAPELÃO, UM MATERIAL LEVE E MALEÁVEL.',
        }).then(function() {
            location.replace("pagina4.html");
        });
    }, 200);
  }
  
}
