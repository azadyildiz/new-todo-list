var inputText = document.getElementById("text-input");
var inputButton = document.querySelector(".icon-add");
var deleteAllButton = document.querySelector(".deleteall-btn");
var list = document.querySelector(".list");
var listitems = document.querySelectorAll(".list-element");
var items =[];
var a;
var b;
let abidene;
isAnyItemInLS(); // CHECKING LOCAL STORAGE BECAUSE OF IS THAT HAVE ANY ITEM
EventListener(); // TAKE ALL EVENT LISTENER TO ONE HEADING

//EVENT LISTENER SIDE
function EventListener(){
    inputButton.addEventListener("click",function(e){
        if(inputText.value != 0){
            setItemLS(inputText.value);
            newElement(inputText.value);
        }
    });
    inputText.addEventListener("keydown",function(e){
        if(e.keyCode==13 && inputText.value != 0){
            setItemLS(inputText.value);
            newElement(inputText.value);
        }
    })
    deleteAllButton.addEventListener("click",function(e){
        deleteAllElements();
    });
    list.addEventListener("click",function(e){
        deleteElement(e);
    });
    list.addEventListener("click",function(e){
        drawElement(e);
    });
}

//EVENT LISTENER ACTION SIDE
var flag = false;
function newElement(text){
        var aLi = createLi(text);
        list.appendChild(aLi);
        inputText.value ="";
}
function createLi(text){
    //Create a li
    var li = document.createElement("li");
    li.className="list-element";
    //Set attributes
    li.setAttribute('draggable',true);
    li.addEventListener("dragstart",function(e){drag(e);});
    li.addEventListener("dragover",function(e){allowDrop(e);});
    li.addEventListener("drop",function(e){drop(e);});
    li.addEventListener("dragleave",function(e){dragLeave(e);});
    //Create a add button
    var i = document.createElement("i");
    i.className = "icon-add";
    //Create a delete button
    var i2 = document.createElement("i");
    i2.className = "icon-delete";
    //Create a span
    var span = document.createElement("span");
    span.className = "element-text";
    span.textContent = text;
    li.appendChild(i);
    li.appendChild(span);
    li.appendChild(i2);
    return li;
}
function deleteAllElements(){
    deleteAllItemsLS();
    for(var i = list.childElementCount-1 ; i >= 0 ; i--){
        list.children[i].remove();
    }
}
function deleteElement(e){
    if(e.target.className == "icon-delete"){
        deleteItemLS(e.target.parentElement.children[1].textContent);
        e.target.parentElement.remove();
    }

}
function drawElement(e){
    if(e.target.className == "icon-add"){
        var a = e.target.parentElement;
        if(flag){
            e.target.style.color = "black";
            a.children[1].style.textDecorationLine = "none";
            flag=false;
        }
        else{
            e.target.style.color = "darkgreen";
            a.children[1].style.textDecorationLine = "line-through";
            flag=true;
        }
    }
}
//LOCAL STORAGE SIDE
function setItemLS(text){
    items.push(text);
    localStorage.setItem("items",JSON.stringify(items));
}
function isAnyItemInLS(){
    if(localStorage.length > 0){
        items = JSON.parse(localStorage.getItem("items"));
        for(var i = 0 ; i < items.length ; i++){
            newElement(items[i]);
        }
    }
}
function deleteItemLS(text){
    items = items.filter(e => e !== text);
    localStorage.setItem("items",JSON.stringify(items));
}
function deleteAllItemsLS(){
    items = [];
    localStorage.setItem("items",JSON.stringify(items));
}

//DRAG DROP SIDE
let dragged ,
    dropped ,
    draggedPos,
    droppedPos;
function drag(event){
    dragged = event.target;
    if(dragged.className != "list-element"){ //CONTROL
        dragged = event.target.parentElement;
    }
}
function drop(event){
    event.preventDefault();
    dropped = event.target;
    if(dropped.className != "list-element"){ // CONTROL
        dropped = event.target.parentElement;
    }
        for(var i = 0 ; i < list.childNodes.length; i++){
        if(list.childNodes[i] == dragged){
            draggedPos = i;
        }
        else if(list.childNodes[i]==dropped){
            droppedPos = i ;
        }
    }
    a = dragged; // ?QUESTION => Burayı böyle yaptığımızda ve aşağıda draggedı değiştirdiğimizde a da değişiyo neden?
    a = dragged.innerHTML;
    b = dropped.innerHTML;
    dragged.innerHTML = b;
    dropped.innerHTML = a;
    dragged.style.opacity = ".75";
    dropped.style.opacity = ".75";
}
function allowDrop(event){ // FOR MOUSE CURSOR
    event.preventDefault();
    if(event.target.className != "list-element"){ //CONTROL
        event.target.parentElement.style.opacity = "1";
    }
    else{
        event.target.style.opacity = "1";
    }
}
function dragLeave(event){
    if(event.target.className != "list-element"){ //CONTROL
        event.target.parentElement.style.opacity = ".75";
    }
    else{
        event.target.style.opacity = ".75";
    }
}