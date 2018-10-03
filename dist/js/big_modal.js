function BigModal(data, callback) {
  var modalElem = $getID(data.id);
  var modal = modalElem.getElementsByTagName("modal", 0);

  modalElem.className += " fadeIn";
 // modal.className += " slideDownIn";
  
  function timer(time) {
    var timer;
    if (time != null) {
      timer = setInterval(function() {
        clearInterval(timer);
        close();
      }, time);
    }
  }

  modalElem.addEventListener("click", function(event) {
    var clickEvent = event.target;
    if (
      clickEvent.tagName === "A" &&
      clickEvent.getAttribute("data") === "close"
    ) {
      close(data.id);
    }
  });

  function close(modal_con) {
   // var modal = modal_con.$getT("modal", 0);
    $getID(modal_con).classList.remove("fadeIn");
   // $getID(modal).classList.remove("slideDownIn");
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
