function BigModal(data, callback) {
  var modalElem = $getID(data.id);
  var modal = $getChild('#'+data.id, 'modal', 0);

  modalElem.className += "fadeIn";
  modal.className += " slideDownIn";
  
  function timer(time) {
    var timer;
    if (time != null) {
      timer = setInterval(function() {
        clearInterval(timer);
        close();
      }, time);
    }
  }

  $getCL("close", 0).addEventListener("click", function(){
     close(modalElem, modal);
  });

  function close(modalElem, modal) {
    modalElem.classList.remove("fadeIn");
    modal.classList.remove("slideDownIn");
    function close() {
    modalElem.className += " fadeOut";
    modal.className += " hideElem";
    modal.classList.remove("slideDownIn");
    setTimeout(function() {
      modalElem.classList.remove("fadeIn");
    }, 500);
  }
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

function $getChild(parent, child, n){
  return document.querySelectorAll(parent+' '+child)[n];
}
