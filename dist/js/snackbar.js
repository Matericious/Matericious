
function Snackbar(data, callback) {
  var openAni = "slideUpBottom", closeAni = "slideDownBottom";
  if (!data.pos) {
    data["pos"] = {
      vertical: "bottom",
      horizontal: "center"
    };
  }

  if (!data.theme) {
    data.theme = "dark";
  }
  
  if(!data.actionButton){
    data.actionButton = "";
  }
  
  if(data.pos.vertical == "top"){
    closeAni = "slideDownTop";
    openAni = "slideUpTop";
  }
    
  var snackbarElem = $getT("snackbar", 0);  
  snackbarElem.innerHTML = "";
  snackbarElem.className = "";
  
  var snackbarClass = data.type + " " + data.pos.vertical + " " + data.pos.horizontal + " " + data.theme;

  snackbarElem.className += snackbarClass;

  var snackbarHTML =
    '<div class="snackbar"><text class="text">'+ data.text +'</text>' +
    '<button class="ripple SnackClose"><i class="material-icons">close</i></button>' +
    '<button class="ripple SnackAction">' +data.actionButton +
    "</button></div>";

  snackbarElem.innerHTML = snackbarHTML;

  $getCL("SnackClose", 0).addEventListener("click", function() {
     close();
  });
  $getCL("SnackAction", 0).addEventListener("click", function() {
    close();
    callback();
  });  
  
  $getCL("snackbar", 0).className += " "+openAni;
  
  function timer(time){
    var timer;
    if(time != null){
       timer = setInterval(function(){
          clearInterval(timer);
          close();
       },time);
     }
  }
  
  function close(){
     $getCL("snackbar", 0).className += " "+closeAni;
  }
  
  timer(data.time);
}


/*this function returns the element by ID*/
function $getID(e) {
  return document.getElementById(e);
}
/*this function returns the element by class name*/
function $getCL(e, n) {
  return document.getElementsByClassName(e)[n];
}
/*this function returns the element by tag name*/
function $getT(e, n) {
  return document.getElementsByTagName(e)[n];
}
