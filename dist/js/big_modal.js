function BigModal(data, callback) {
  var modalElem = $get("#"+data.id);
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

  $get(".close").addEventListener("click", function(){
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

function $get(e) {
  return document.querySelector(e);
}


function $getChild(parent, child, n){
  return document.querySelectorAll(parent+' '+child)[n];
}
