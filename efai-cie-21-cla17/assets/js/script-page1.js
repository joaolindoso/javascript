const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
let correct = 0;
let total = 0;
const totalDraggableItems = 1;
const totalMatchingPairs = 2; // Deve ser <= totalDraggableItems

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); 
//   Dispara assim que o usuário começa a arrastar um item 'draggable' - É aqui que podemos definir os dados de arrasto.
//   elem.addEventListener ("dragstart", dragStart); Dispara quando um item arrastado (seleção de elemento ou texto) é arrastado
//   elem.addEventListener("dragend", dragEnd); É acionado quando uma operação de arrasto termina (como soltar um botão do mouse ou apertar a tecla Esc) - Depois que a operação arrastar e soltar estiver concluída.
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); // Dispara quando o item 'dragged' entra em um objeto 'drop target' válido.
  elem.addEventListener("dragover", dragOver); // Dispara quando o 'dragged' item está sendo arrastado sobre um 'drop target' válido, repetidamente enquanto o item 'dragged' está dentro da 'drop zone'
  elem.addEventListener("dragleave", dragLeave); // Dispara quando o 'dragged item' deixa um um 'drop target' válido.
  elem.addEventListener("drop", drop); // Dispara quando um item é jogado/deixado em um 'drop target' válido.
});

// Drag and Drop Functions

// Eventos disparados sobre o drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // ou "texto/plain", mas apenas "text" também funciona, uma vez que não estamos definindo qualquer outro tipo/formato para o valor dos dados.
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
  const draggableElementData = event.dataTransfer.getData("text"); // Obtém os dados do objeto 'dragged'. Este método retornará qualquer dado que foi 'setado' com o mesmo tipo no método setData().

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
        }).then(function() {
            location.replace("pagina2.html");
        });
    }, 200);
  }
  
}
