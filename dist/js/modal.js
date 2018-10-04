function Modal(data, callback) {
  if (!data.pos) {
    data["pos"] = {
      vertical: "center",
      horizontal: "center"
    };
  }

  if (!data.theme) data.theme = "";

  if (!data.title) data.title = "Modal";

  if (!data.message)
    data.message =
      "This is the awesome modal you can use to show cool messages!";

  if (!data.overlayStyle) data.overlayStyle = "";

  if (data.overlay === false) {
    data.overlay = "";
  } else {
    data.overlay = "overlay";
  }

  var modalElem = $getT("modal-con", 0);
  modalElem.innerHTML = "";
  modalElem.className = "";

  if (data.primary == "") data.primary = "OK";

  if (!data.secondaryButton || data.secondaryButton == "")
    data.secondaryButton = "";

  if (data.title == "") data.title = "modal";

  if (!data.modalStyle) data.modalStyle = "ocean";

  if (data.message == "") data.message = "";

  var messageModalHTML =
    '<modal class="' +
    data.modalStyle +
    '">' +
    "<header>" +
    data.title +
    "</header><main>" +
    data.message +
    "</main>" +
    '<action><button class="actionTwo">' +
    data.secondaryButton +
    '</button><button class="actionOne">' +
    data.primaryButton +
    "</button></action></modal>";

  var decisionModalHTML =
    '<modal class="' +
    data.type +
    " " +
    data.modalStyle +
    '"><header>' +
    data.message +
    "</header>" +
    '<action><button class="actionTwo">' +
    data.secondaryButton +
    '</button><button class="actionOne">' +
    data.primaryButton +
    "</button></action></modal>";

  var modalClass =
    data.overlay +
    " " +
    data.pos.vertical +
    " " +
    data.pos.horizontal +
    " " +
    data.theme +
    " " +
    data.overlayStyle;

  if (data.type == "message") {
    modalElem.innerHTML = messageModalHTML;
  } else if (data.type == "decision") {
    modalElem.innerHTML = decisionModalHTML;
  }

  modalElem.className += modalClass;

  $getT("modal-con", 0).className += " fadeIn";
  $getT("modal", 0).className += " slideDownIn";

  $getCL("actionTwo", 0).addEventListener("click", function() {
    close();
    callback(false);
  });
  $getCL("actionOne", 0).addEventListener("click", function() {
    close();
    callback(true);
  });

  function timer(time) {
    var timer;
    if (time != null) {
      timer = setInterval(function() {
        clearInterval(timer);
        close();
      }, time);
    }
  }

  function close() {
    $getT("modal-con", 0).className += " fadeOut";
    $getT("modal", 0).className += " hideElem";
    $getT("modal", 0).classList.remove("slideDownIn");
    setTimeout(function() {
      $getT("modal-con", 0).classList.remove("fadeIn");
    }, 500);
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
